import React from 'react'
import { useGame } from '../utils/gameContext'

export default function Inventory() {
  const [state, dispatch] = useGame()

  if (!state) return <div>Loading</div>

  return (
    <div className="flex justify-around pt-7">
      <div>
        <h1 className="border-b-2 dark:border-b-white border-b-black mb-2">
          Backpack
        </h1>
        <ul>
          {state.inventory.map((item, i) => (
            <li key={item.name + i}>
              <button
                onClick={() =>
                  dispatch({ type: 'EQUIP', payload: { itemId: item.id } })
                }
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="border-b-2 dark:border-b-white border-b-black mb-2">
          Equipped
        </h2>
        <ul>
          <li>Head: {state.equipment.head?.name ?? ':('}</li>
          <li>Top: {state.equipment.top?.name ?? ':('}</li>
          <li>Bottom: {state.equipment.bottom?.name ?? ':('}</li>
          <li>Shoes: {state.equipment.shoes?.name ?? ':('}</li>
          <li>Necklace: {state.equipment.necklace?.name ?? ':('}</li>
          <li>Ring: {state.equipment.ring?.name ?? ':('}</li>
        </ul>
        <h3 className="border-b-2 dark:border-b-white border-b-black mb-2 mt-4">
          Effects:
        </h3>
        <div>
          <ul>
            <li>
              {state.equipment.head?.effects && (
                <div>
                  Head:
                  {state.equipment.head.effects.map((effect) => (
                    <EffectsDisplay effect={effect} />
                  ))}
                </div>
              )}
            </li>
            <li>
              {state.equipment.top?.effects && (
                <div>
                  Top:
                  {state.equipment.top.effects.map((effect) => (
                    <EffectsDisplay effect={effect} />
                  ))}
                </div>
              )}
            </li>
            <li>
              {state.equipment.bottom?.effects && (
                <div>
                  Bottom:
                  {state.equipment.bottom.effects.map((effect) => (
                    <EffectsDisplay effect={effect} />
                  ))}
                </div>
              )}
            </li>
            <li>
              {state.equipment.shoes?.effects && (
                <div>
                  Shoes:
                  {state.equipment.shoes.effects.map((effect) => (
                    <EffectsDisplay effect={effect} />
                  ))}
                </div>
              )}
            </li>
            <li>
              {state.equipment.necklace?.effects && (
                <div>
                  Necklace:
                  {state.equipment.necklace.effects.map((effect) => (
                    <EffectsDisplay effect={effect} />
                  ))}
                </div>
              )}
            </li>
            <li>
              {state.equipment.ring?.effects && (
                <div>
                  Ring:
                  {state.equipment.ring.effects.map((effect) => (
                    <EffectsDisplay effect={effect} />
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function EffectsDisplay({ effect }) {
  if (effect.type === 'SCAVENGE_SPEED') {
    return (
      <span className="px-2">Scavenging takes {effect.scavengeSpeed} less</span>
    )
  } else if (effect.type === 'RUNNING_SPEED') {
    return <span className="px-2">Running increased by {effect.speed}</span>
  }
  return <span>Wut is dis????</span>
}
