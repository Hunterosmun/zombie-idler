import { z } from 'zod'

import scavengingData from './inventory'

const Category = z.enum([
  'head',
  'top',
  'bottom',
  'shoes',
  'necklace',
  'ring',
  'material'
])

const RunningSpeedEffect = z.object({
  type: z.literal('RUNNING_SPEED'),
  speed: z.number().int()
})

const ScavengeSpeedEffect = z.object({
  type: z.literal('SCAVENGE_SPEED'),
  scavengeSpeed: z.number().int()
})

const ReadingSpeedEffect = z.object({
  type: z.literal('READING_SPEED'),
  readingSpeed: z.number().int()
})

const Effect = z.union([
  RunningSpeedEffect,
  ScavengeSpeedEffect,
  ReadingSpeedEffect
])

/** @typedef {z.infer<typeof Item>} Item */
const Item = z.object({
  id: z.string(),
  type: Category,
  name: z.string(),
  effects: z.array(Effect)
})

const scavengingItems = z.array(Item).parse(scavengingData)

const AcquiredItem = Item.extend({
  count: z.number().int()
})

const State = z.object({
  distanceFromZombie: z.number().int().nonnegative(),
  zombieInterval: z.number().int().nonnegative(),
  zombieStride: z.number().int().nonnegative(),
  equipment: z.object({
    head: AcquiredItem.nullable(),
    top: AcquiredItem.nullable(),
    bottom: AcquiredItem.nullable(),
    shoes: AcquiredItem.nullable(),
    necklace: AcquiredItem.nullable(),
    ring: AcquiredItem.nullable()
  }),
  inventory: z.record(AcquiredItem),
  showInventory: z.boolean(),
  showResearch: z.boolean(),
  researchPoints: z.number().int(),
  scavengingTimer: z.number().int(),
  scavengeInterval: z.number().int(),
  allowScavenging: z.boolean(),
  allowReading: z.boolean(),
  readingTimer: z.number().int(),
  readingInterval: z.number().int(),
  busyAction: z.string().nullable()
})

/** @type {z.infer<typeof State>} */
const startingGame = {
  distanceFromZombie: 25,
  zombieInterval: 60,
  zombieStride: 1,
  equipment: {
    head: null,
    top: null,
    bottom: null,
    shoes: null,
    necklace: null,
    ring: null
  },
  inventory: {},
  showInventory: false,
  showResearch: false,
  researchPoints: 0,
  allowScavenging: false,
  scavengeInterval: 60,
  scavengingTimer: 0,
  allowReading: false,
  readingTimer: 0,
  readingInterval: 60,
  busyAction: null
}

/**
 * @template T
 * @param {T[]} items
 * @returns {T}
 */
function pickRandom(items) {
  return items[random(0, items.length - 1)]
}

/**
 * @param {number} min
 * @param {number} max
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @param {z.infer<typeof State>} state
 */

function gatherEffects(state) {
  return Object.values(state.equipment)
    .filter((item) => item !== null)
    .flatMap((item) => item.effects)
}

/**
 * @param {number} a
 * @param {number} b
 */
function sum(a, b) {
  return a + b
}

/**
 * @param {z.infer<typeof State>} state
 * @param {*} action
 * @returns {z.infer<typeof State>}
 */
export function gameReducer(state = State.parse(startingGame), action) {
  if (state.distanceFromZombie <= 0) return state
  switch (action.type) {
    case 'RUN': {
      if (state.busyAction) return state
      const speed = gatherEffects(state)
        .filter((effect) => effect.type === 'RUNNING_SPEED')
        .map((effect) => effect.speed)
        .reduce(sum, 1)

      let { allowScavenging, allowReading } = state
      const distanceFromZombie = Math.max(state.distanceFromZombie + speed, 0)
      if (distanceFromZombie >= 100) allowScavenging = true
      if (distanceFromZombie >= 1000) allowReading = true
      return {
        ...state,
        distanceFromZombie,
        allowScavenging,
        allowReading
      }
    }
    case 'TICK': {
      const { count } = action.payload
      let {
        scavengingTimer,
        showInventory,
        inventory,
        busyAction,
        readingTimer,
        showResearch,
        researchPoints
      } = state

      const zombieInterval = state.zombieInterval
      const zombieShouldRun = count % zombieInterval === 0
      const distanceFromZombie = zombieShouldRun
        ? state.distanceFromZombie - state.zombieStride
        : state.distanceFromZombie

      const scavengeShouldRun =
        state.busyAction === 'SCAVENGE' && count % state.scavengeInterval === 0
      const readShouldRun =
        state.busyAction === 'READ_BOOK' && count % state.readingInterval === 0
      if (scavengeShouldRun) {
        if (scavengingTimer === 1) {
          const item = Item.parse(pickRandom(scavengingItems))
          const exist = inventory[item.id]
          inventory = exist
            ? { ...inventory, [item.id]: { ...exist, count: exist.count + 1 } }
            : { ...inventory, [item.id]: { ...item, count: 1 } }

          showInventory = true
          busyAction = null
        }
        scavengingTimer = Math.max(scavengingTimer - 1, 0)
      } else if (readShouldRun) {
        if (readingTimer === 1) {
          researchPoints += 1
          showResearch = true
          busyAction = null
        }
        readingTimer = Math.max(readingTimer - 1, 0)
      }

      return {
        ...state,
        distanceFromZombie,
        scavengingTimer,
        showInventory,
        readingTimer,
        inventory,
        busyAction,
        showResearch,
        researchPoints
      }
    }
    case 'SCAVENGE': {
      if (!state.allowScavenging) return state
      if (state.busyAction) return state

      const effectModifier = gatherEffects(state)
        .filter((effect) => effect.type === 'SCAVENGE_SPEED')
        .map((effect) => effect.scavengeSpeed)
        .reduce(sum, 0)
      return {
        ...state,
        scavengingTimer: Math.max(50 + effectModifier, 1),
        busyAction: 'SCAVENGE'
      }
    }
    case 'READ_BOOK': {
      if (!state.allowReading) return state
      if (state.busyAction) return state
      return { ...state, readingTimer: 300, busyAction: 'READ_BOOK' }
    }
    case 'EQUIP': {
      if (state.scavengingTimer !== 0) return state
      if (!action.payload.itemId) return state

      const item = state.inventory[action.payload.itemId]
      if (!item) return state
      if (item.type === 'material') return state

      return {
        ...state,
        equipment: { ...state.equipment, [item.type]: item }
      }
    }
    case 'UNEQUIP': {
      if (state.scavengingTimer !== 0) return state
      if (!action.payload.type) return state
      const type = action.payload.type
      if (!state.equipment[type]) return state

      return {
        ...state,
        equipment: { ...state.equipment, [type]: null }
      }
    }
    default:
      return state
  }
}
