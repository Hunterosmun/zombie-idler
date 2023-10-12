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

const State = z.object({
  distanceFromZombie: z.number().int().nonnegative(),
  equipment: z.object({
    head: Item.nullable(),
    top: Item.nullable(),
    bottom: Item.nullable(),
    shoes: Item.nullable(),
    necklace: Item.nullable(),
    ring: Item.nullable()
  }),
  inventory: z.array(Item),
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

/**
 * @param {z.infer<typeof State>} state
 * @param {*} action
 * @returns {z.infer<typeof State>}
 */
export function gameReducer(state = State.parse(startingGame), action) {
  if (state.distanceFromZombie <= 0) return state
  switch (action.type) {
    case 'RUN': {
      if (state.distanceFromZombie === 0) return state
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
      if (scavengingTimer === 1) {
        // TODO: get new item
        showInventory = true
      }
      return {
        ...state,
        distanceFromZombie: state.distanceFromZombie - 1,
        scavengingTimer: Math.max(scavengingTimer - 1, 0),
        showInventory
      }
    }
    case 'SCAVENGE': {
      if (!state.allowScavenging) return state
      if (state.scavengingTimer !== 0) return state
      return {
        ...state,
        scavengingTimer: 50
      }
    }
    default:
      return state
  }
}
