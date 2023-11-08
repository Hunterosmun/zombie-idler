# First things first

- `npm i` to get the dependencies
- `npm run dev` to start your sever.
- Go to localhost:3000 and see the server!

# Second things second

## Game state

The game will have a counter for how close the zombie is to the player, this will tick down at a rate of 1/tick

Player:

- Distance from Zombie (if this counter ever reaches 0, the player dies)
- Equipment (Head, Top, Bottom, Shoes) (these will affect gameplay stats, such as speed you run away from zombies)

Actions:

- Run (this increases distance from zombies)
- Scavenge (this will get new equipment and materials, will reduce the distance by _X_ amount)
  - Will only appear at distance 100
  - will consume 50 ticks
- Build wall (this will stop the distance from reducing for _X_ amount of time)
- Equip (this will be it's own page, so players can see what they are wearing and what they have) (equiping may take time to accomplish)
- Research (this will reduce the distance by _large X_ amount of time, give research points for upgrading the player in _magical_ way?)

## Research ideas:

- A button that will stop the player from scavenging if scavenging would kill them
- A button that will auto-scavenge when they are above a certain tick?
- A way to automate running...?
- A way to change the tick speed
- Ability to have scavenge tick just skip instead of actively counting down (clicking it would just subtract the 50 or whatever from your distance)
- Decrease time it takes to scavenge

## Plans:

- Make "Read a book" action, takes longer than scavenge, gives research points (this will lead to researching things)
- Give items durability, they will run out while researched things won't
- Ability to dismantle items in order to get material to repair other items (FIRST need to research ability to repair?)

## Brainstorms

- Max distance from zombies? Maybe at 50K distance you start going towards zombies or something? Like they're a giant circle around you that you can't fully avoid?
- Once you have X fragments of Casey's soul you can... take out a credit card in his name...?
