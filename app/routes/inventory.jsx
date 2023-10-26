import React from 'react'
import { useGame } from '../utils/gameContext'

export default function Inventory() {
  const [state, dispatch] = useGame()

  return (
    <div>
      <ul>
        {state.inventory.map((item, i) => (
          <li key={item.name + i}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
