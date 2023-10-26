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
          <li>
            Head:{' '}
            <button
              onClick={() => {
                if (!state.equipment.head.id) return
                dispatch({ type: 'UNEQUIP', payload: { type: 'head' } })
              }}
            >
              {state.equipment.head?.name ?? ':('}
            </button>
          </li>
          <li>
            Top:{' '}
            <button
              onClick={() => {
                if (!state.equipment.top.id) return
                dispatch({ type: 'UNEQUIP', payload: { type: 'top' } })
              }}
            >
              {state.equipment.top?.name ?? ':('}
            </button>
          </li>
          <li>
            Bottom:{' '}
            <button
              onClick={() => {
                if (!state.equipment.bottom.id) return
                dispatch({ type: 'UNEQUIP', payload: { type: 'bottom' } })
              }}
            >
              {state.equipment.bottom?.name ?? ':('}
            </button>
          </li>
          <li>
            Shoes:{' '}
            <button
              onClick={() => {
                if (!state.equipment.shoes.id) return
                dispatch({ type: 'UNEQUIP', payload: { type: 'shoes' } })
              }}
            >
              {state.equipment.shoes?.name ?? ':('}
            </button>
          </li>
          <li>
            Necklace:{' '}
            <button
              onClick={() => {
                if (!state.equipment.necklace.id) return
                dispatch({ type: 'UNEQUIP', payload: { type: 'necklace' } })
              }}
            >
              {state.equipment.necklace?.name ?? ':('}
            </button>
          </li>
          <li>
            Ring:{' '}
            <button
              onClick={() => {
                if (!state.equipment.ring.id) return
                dispatch({ type: 'UNEQUIP', payload: { type: 'ring' } })
              }}
            >
              {state.equipment.ring?.name ?? ':('}
            </button>
          </li>
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
