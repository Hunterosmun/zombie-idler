import React from 'react'

import { useGame } from '../utils/gameContext'

export default function Home() {
  const [state, dispatch] = useGame()

  if (!state) return <div>Loading</div>

  return (
    <div className="px-6">
      <div className="border-2 border-gray-300 mb-2 w-60 dark:text-white flex items-center flex-col p-2">
        {state.distanceFromZombie}
        <div className="border-t-2 border-gray-300">Distance from Zombies</div>
      </div>
      <div>
        <button
          onClick={() => dispatch({ type: 'RUN' })}
          className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400 active:bg-gray-600"
        >
          RUN
        </button>
      </div>
    </div>
  )
}
