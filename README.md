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

A potential thing for the person to research would be a way to change the tick speed??
