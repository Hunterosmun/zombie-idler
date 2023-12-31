import React from 'react'
import cx from 'clsx'

import { useGame } from '../utils/gameContext'

export default function Home() {
  const [state, dispatch] = useGame()

  if (!state) return <div className="dark:text-white">Loading</div>
  const safetyLevel = getSafetyLevel(state)
  const zdist = state.distanceFromZombie

  const effects = Object.values(state.equipment).reduce(
    (acc, item) => {
      let scavengeChange = 0
      let speedChange = 0
      item?.effects?.forEach((ef) => {
        if (ef.type === 'SCAVENGE_SPEED') scavengeChange = ef.scavengeSpeed
        if (ef.type === 'RUNNING_SPEED') speedChange = ef.speed
      })
      return {
        speed: acc.speed + speedChange,
        scavengeSpeed: acc.scavengeSpeed + scavengeChange
      }
    },
    { speed: 1, scavengeSpeed: 50 }
  )

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
        {safetyLevel === 'dead'
          ? 'DEAD'
          : state.busyAction === 'READ_BOOK'
          ? 'such a good plot!'
          : zdist}
        <div className="border-t-2 border-gray-300">Distance from Zombies</div>
      </div>
      {safetyLevel !== 'dead' && (
        <>
          <div>
            <button
              onClick={() => dispatch({ type: 'RUN' })}
              className="bg-gray-500 px-5 py-2 rounded hover:bg-gray-600 active:bg-gray-700 mb-2 disabled:bg-gray-700 disabled:text-gray-400 border-2 border-transparent disabled:border-black"
              disabled={state.busyAction}
            >
              RUN
            </button>
            <span className="pl-2">Speed: {effects.speed}</span>
          </div>
          {state.allowScavenging && (
            <div>
              <button
                onClick={() => dispatch({ type: 'SCAVENGE' })}
                className="bg-gray-500 px-5 py-2 rounded hover:bg-gray-600 active:bg-gray-700 mb-2 disabled:bg-gray-700 disabled:text-gray-400 border-2 border-transparent disabled:border-black mr-2"
                disabled={state.busyAction}
              >
                Scavenge
              </button>
              {state.scavengingTimer === 0
                ? `Scavenging will consume ${effects.scavengeSpeed} ticks (You cannot run during this time)`
                : `Time left scavenging: ${state.scavengingTimer}`}
            </div>
          )}
          {state.allowReading && (
            <div>
              <button
                onClick={() => dispatch({ type: 'READ_BOOK' })}
                className="bg-gray-500 px-5 py-2 rounded hover:bg-gray-600 active:bg-gray-700 mb-2 disabled:bg-gray-700 disabled:text-gray-400 border-2 border-transparent disabled:border-black mr-2"
                disabled={state.busyAction}
              >
                Read a book
              </button>
              {state.busyAction == 'READ_BOOK'
                ? 'Pulled into the book, you basically forget about zombies entirely'
                : 'This will consume a lot of time.'}
            </div>
          )}
        </>
      )}
      <pre>{JSON.stringify(state, null, 2)}</pre>
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
