// 'head',
// 'top',
// 'bottom',
// 'shoes',
// 'necklace',
// 'ring',
// 'material'
export default [
  {
    type: 'material',
    name: "Casey's imortal soul (fragment)",
    effects: []
  },
  { type: 'material', name: "Rock (from Casey's garden)", effects: [] },
  {
    type: 'head',
    name: 'Intro hat',
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -1 }]
  },
  {
    type: 'head',
    name: 'Giant duck mascot head',
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -2 }]
  },
  {
    type: 'head',
    name: 'Sleek MOOSE mascot head',
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -5 }]
  },
  {
    type: 'necklace',
    name: 'Intro necklace',
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -1 }]
  },
  {
    type: 'necklace',
    name: 'Teeth of your enemies (on a string)',
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -5 }]
  },
  {
    type: 'necklace',
    name: "grandma's favorite pendant",
    effects: [{ type: 'SCAVENGE_SPEED', scavengeSpeed: -3 }]
  },
  {
    type: 'top',
    name: 'Intro shirt',
    effects: [{ type: 'RUNNING_SPEED', speed: 1 }]
  },
  {
    type: 'top',
    name: 'Triathalon shirt (number 672 still pinned on the back)',
    effects: [{ type: 'RUNNING_SPEED', speed: 2 }]
  },
  {
    type: 'top',
    name: 'sweat stained training shirt',
    effects: [{ type: 'RUNNING_SPEED', speed: 1 }]
  },
  {
    type: 'ring',
    name: 'Magic intro ring',
    effects: [
      { type: 'RUNNING_SPEED', speed: 1 },
      { type: 'SCAVENGE_SPEED', scavengeSpeed: -1 }
    ]
  },
  {
    type: 'ring',
    name: 'Magic intro ring (Epic)',
    effects: [
      { type: 'RUNNING_SPEED', speed: 5 },
      { type: 'SCAVENGE_SPEED', scavengeSpeed: -5 }
    ]
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
    name: 'Intro shorts',
    effects: [{ type: 'RUNNING_SPEED', speed: 1 }]
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
    type: 'shoes',
    name: 'Terrible shoes filled with nails, snails, and fire',
    effects: [{ type: 'RUNNING_SPEED', speed: -5 }]
  },
  {
    type: 'shoes',
    name: 'Intro shoes',
    effects: [{ type: 'RUNNING_SPEED', speed: 1 }]
  },
  {
    type: 'shoes',
    name: 'Damp sneakers',
    effects: [{ type: 'RUNNING_SPEED', speed: 2 }]
  },
  {
    type: 'shoes',
    name: 'Olympic shoes (Legendary)',
    effects: [{ type: 'RUNNING_SPEED', speed: 10 }]
  }
]
