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
  effect: z.array(Effect)
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
  scavengingTimer: z.number().int()
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
  scavengingTimer: 0
}

export function gameReducer(state = startingGame, action) {
  switch (action.type) {
    case 'RUN': {
      const speed = Object.values(state.equipment).reduce(
        (acc, item) =>
          item?.effects.reduce((acc2, effect) => {
            if (effect.type === 'RUNNING_EFFECT') acc2 += effect.speed
            return acc2
          }, acc) ?? acc,
        1
      )
      return {
        ...state,
        distanceFromZombie: state.distanceFromZombie + speed
      }
    }
    case 'TICK': {
      return {
        ...state,
        distanceFromZombie: state.distanceFromZombie - 1
      }
    }
    case 'DEATH': {
      return {
        ...state,
        distanceFromZombie: 0
      }
    }
    default:
      return state
  }
}
