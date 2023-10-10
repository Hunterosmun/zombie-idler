import React from 'react'
import Game from '../../server/game'

const GameContext = React.createContext()

export function useGame() {
  const context = React.useContext(GameContext)
  return context
}

export function Provider({ children }) {
  const [game, setGame] = React.useState(null)
  const [state, setState] = React.useState(null)
  React.useEffect(() => {
    setGame((game) => {
      if (game) return game
      return Game((state) => setState({ ...state }))
    })
  }, [])
  return (
    <GameContext.Provider value={{ game, state }}>
      {children}
    </GameContext.Provider>
  )
}
