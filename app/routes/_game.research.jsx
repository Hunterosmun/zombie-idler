import React from 'react'
import { useNavigate } from '@remix-run/react'
import { useGame } from '../utils/gameContext'

export default function Research() {
  const [state, dispatch] = useGame()

  if (!state) return <div>Loading...</div>

  return (
    <div className="flex justify-around pt-7">
      <div>
        <h1 className="border-b-2 dark:border-b-white border-b-black mb-2">
          The Lab!
        </h1>
        <div>Research points: {state.researchPoints}</div>
      </div>
    </div>
  )
}
