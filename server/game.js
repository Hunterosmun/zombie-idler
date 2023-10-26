import { z } from 'zod'

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

const Effect = z.union([RunningSpeedEffect, ScavengeSpeedEffect])

const Item = z.object({
  type: Category,
  name: z.string(),
  effects: z.array(Effect)
})

const AcquiredItem = Item.extend({
  id: z.string()
})

const State = z.object({
  distanceFromZombie: z.number().int().nonnegative(),
  equipment: z.object({
    head: AcquiredItem.nullable(),
    top: AcquiredItem.nullable(),
    bottom: AcquiredItem.nullable(),
    shoes: AcquiredItem.nullable(),
    necklace: AcquiredItem.nullable(),
    ring: AcquiredItem.nullable()
  }),
  inventory: z.array(AcquiredItem),
  showInventory: z.boolean(),
  scavengingTimer: z.number().int(),
  allowScavenging: z.boolean()
})

const startingGame = {
  distanceFromZombie: 25,
  equipment: {
    head: null,
    top: null,
    bottom: null,
    shoes: null,
    necklace: null,
    ring: null
  },
  inventory: [],
  showInventory: false,
  allowScavenging: false,
  scavengingTimer: 0
}

// 'head',
// 'top',
// 'bottom',
// 'shoes',
// 'necklace',
// 'ring',
// 'material'
const scavengingItems = z.array(Item).parse([
  {
    type: 'shoes',
    name: 'Intro shoes',
    effects: [{ type: 'RUNNING_SPEED', speed: 2 }]
  },
  { type: 'material', name: "Casey's imortal soul (fragment)", effects: [] },
  {
    type: 'head',
    name: 'Intro hat',
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -5 }]
  },
  { type: 'material', name: "Rock (from Casey's garden)", effects: [] },
  {
    type: 'ring',
    name: 'Magic intro ring (Epic)',
    effects: [
      { type: 'RUNNING_SPEED', speed: 5 },
      { type: 'SCAVENGE_SPEED', scavengeSpeed: -5 }
    ]
  },
  {
    type: 'shoes',
    name: 'Olympic shoes (Legendary)',
    effects: [{ type: 'RUNNING_SPEED', speed: 10 }]
  },
  {
    type: 'necklace',
    name: 'Teeth of your enemies (on a string)',
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -5 }]
  },
  {
    type: 'bottom',
    name: 'Sweat pants of laziness',
    effects: [{ type: 'RUNNING_SPEED', speed: -5 }]
  },
  {
    type: 'bottom',
    name: 'Sweat pants of laziness (Legendary)',
    effects: [{ type: 'RUNNING_SPEED', speed: -15 }]
  },
  {
    type: 'bottom',
    name: 'Running short shorts',
    effects: [{ type: 'RUNNING_SPEED', speed: 2 }]
  },
  {
    type: 'bottom',
    name: 'Shorter running short shorts (Legendary)',
    effects: [{ type: 'RUNNING_SPEED', speed: 5 }]
  },
  {
    type: 'top',
    name: 'Triathalon shirt (number 672 still pinned on the back)',
    effects: [{ type: 'RUNNING_SPEED', speed: 2 }]
  },
  {
    type: 'shoes',
    name: 'Terrible shoes filled with nails, snails, and fire',
    effects: [{ type: 'RUNNING_SPEED', speed: -5 }]
  }
])

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
 * @param {*} action
 * @returns {z.infer<typeof State>}
 */
export function gameReducer(state = State.parse(startingGame), action) {
  if (state.distanceFromZombie <= 0) return state
  switch (action.type) {
    case 'RUN': {
      if (state.scavengingTimer !== 0) return state
      const speed = Object.values(state.equipment).reduce(
        (acc, item) =>
          item?.effects.reduce((acc2, effect) => {
            switch (effect.type) {
              case 'RUNNING_SPEED':
                return acc2 + effect.speed
            }
            return acc2
          }, acc) ?? acc,
        1
      )
      let allowScavenging = state.allowScavenging
      const distanceFromZombie = Math.max(state.distanceFromZombie + speed, 0)
      if (distanceFromZombie >= 100) allowScavenging = true
      return {
        ...state,
        distanceFromZombie,
        allowScavenging
      }
    }
    case 'TICK': {
      let scavengingTimer = state.scavengingTimer
      let showInventory = state.showInventory
      let inventory = state.inventory
      if (scavengingTimer === 1) {
        const item = Item.parse(pickRandom(scavengingItems))
        inventory = [{ ...item, id: crypto.randomUUID() }, ...inventory]
        showInventory = true
      }
      return {
        ...state,
        distanceFromZombie: state.distanceFromZombie - 1,
        scavengingTimer: Math.max(scavengingTimer - 1, 0),
        showInventory,
        inventory
      }
    }
    case 'SCAVENGE': {
      if (!state.allowScavenging) return state
      if (state.scavengingTimer !== 0) return state
      const effectModifier = Object.values(state.equipment)
        .filter(Boolean)
        .flatMap((item) => item.effects)
        .filter((effect) => effect.type === 'SCAVENGE_SPEED')
        .reduce((total, effect) => total + effect.scavengeSpeed, 0)
      return {
        ...state,
        scavengingTimer: Math.max(50 + effectModifier, 1)
      }
    }
    case 'EQUIP': {
      if (state.scavengingTimer !== 0) return state
      if (!action.payload.itemId) return state

      const item = state.inventory.find(
        (item) => item.id === action.payload.itemId
      )
      if (!item) return state

      let inventory = state.inventory.filter((itm) => item !== itm)
      if (state.equipment[item.type]) {
        inventory = [...inventory, state.equipment[item.type]]
      }

      return {
        ...state,
        inventory,
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
        inventory: [...state.inventory, state.equipment[type]],
        equipment: { ...state.equipment, [type]: null }
      }
    }
    default:
      return state
  }
}
