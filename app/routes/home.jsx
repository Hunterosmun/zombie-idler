import React from 'react'
import cx from 'clsx'

import { useGame } from '../utils/gameContext'

export default function Home() {
  const [state, dispatch] = useGame()

  if (!state) return <div className="dark:text-white">Loading</div>
  const safetyLevel = getSafetyLevel(state)
  const zdist = state.distanceFromZombie

  return (
    <div className="px-6 mt-6 dark:text-white">
      <div
        className={cx(
          {
            'text-red-500 border-red-500': safetyLevel === 'dead',
            'text-red-500 border-red-500 animate-danger-wiggle':
              safetyLevel === 'nearlyDead',
            'text-orange-400 border-orange-300 border-opacity-75 animate-pulse':
              safetyLevel === 'dangerZone',
            'dark:text-white border-gray-300': safetyLevel === 'relativeSafety'
          },
          'border-2 mb-2 w-60 flex items-center flex-col p-2'
        )}
      >
        {safetyLevel === 'dead' ? 'DEAD' : zdist}
        <div className="border-t-2 border-gray-300">Distance from Zombies</div>
      </div>
      {safetyLevel !== 'dead' && (
        <>
          <div>
            <button
              onClick={() => dispatch({ type: 'RUN' })}
              className="bg-gray-500 px-5 py-2 rounded hover:bg-gray-600 active:bg-gray-700 mb-2 disabled:bg-gray-700 disabled:text-gray-400 border-2 border-transparent disabled:border-black"
              disabled={state.scavengingTimer > 0}
            >
              RUN
            </button>
          </div>
          {state.allowScavenging && (
            <div>
              <button
                onClick={() => dispatch({ type: 'SCAVENGE' })}
                className="bg-gray-500 px-5 py-2 rounded hover:bg-gray-600 active:bg-gray-700 mb-2 disabled:bg-gray-700 disabled:text-gray-400 border-2 border-transparent disabled:border-black mr-2"
                disabled={state.scavengingTimer > 0}
              >
                Scavenge
              </button>
              {state.scavengingTimer === 0
                ? 'Scavenging will consume 50 ticks (You cannot run during this time)'
                : `Time left scavenging: ${state.scavengingTimer}`}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function getSafetyLevel(state) {
  const zdist = state.distanceFromZombie
  if (zdist > 40) return 'relativeSafety'
  if (zdist > 15) return 'dangerZone'
  if (zdist > 0) return 'nearlyDead'
  return 'dead'
}
