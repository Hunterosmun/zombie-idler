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

const Item = z.object({
  type: Category,
  name: z.string(),
  effect: z.string()
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
  scavengingTimer: z.integer()
})

export default function Game() {
  const state = State.parse()
  function changeDistance(amount) {
    state.distanceFromZombie += amount
    return state
  }

  const tick = setInterval(() => {
    console.log('tick~~~!!!!!!')
    changeDistance(-1)
  }, 1000)

  function run() {
    changeDistance(1)
  }
  return {
    changeDistance,
    scavenge() {
      console.log('dontcha wish scavenging did something?')
    },
    init() {
      return State.parse({})
    },
    run,
    tick
  }
}
