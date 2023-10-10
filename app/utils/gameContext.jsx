import React from 'react'

import { gameReducer } from '../../server/game'

const StateContext = React.createContext()
const DispatchContext = React.createContext()

export function useGame() {
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  return [state, dispatch]
}

export function Provider({ children }) {
  const [state, dispatch] = React.useReducer(gameReducer)
  React.useEffect(() => {
    const ticker = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)
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
