import React from 'react'

import { gameReducer } from '../server/game'

const StateContext = React.createContext()
const DispatchContext = React.createContext()

export function useGame() {
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  return [state, dispatch]
}

const TICKS_PER_SECOND = 60

export function Provider({ children }) {
  const [state, dispatch] = React.useReducer(gameReducer)
  React.useEffect(() => {
    let count = 0
    const ticker = setInterval(() => {
      dispatch({ type: 'TICK', payload: { count: count + 1 } })
      count = (count + 1) % TICKS_PER_SECOND
    }, 1000 / TICKS_PER_SECOND)
    return () => clearInterval(ticker)
  }, [])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
