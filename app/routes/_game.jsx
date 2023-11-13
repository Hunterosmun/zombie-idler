import { NavLink, Outlet } from '@remix-run/react'
import React from 'react'

import { useGame } from '../utils/gameContext'

export default function () {
  const [state] = useGame()
  return (
    <div>
      <h1 className="dark:text-white pl-5 whitespace-nowrap absolute">
        Zombie Idler
      </h1>
      <nav className="w-full dark:text-white">
        <ul className="flex justify-evenly">
          <li>
            <NavLink
              to="/home"
              className="[&.active]:border-b-2 hover:border-b-2 hover:border-b-white"
            >
              Home
            </NavLink>
          </li>
          {!!state?.showInventory && (
            <li>
              <NavLink
                to="/inventory"
                className="[&.active]:border-b-2 hover:border-b-2 hover:border-b-white"
              >
                Inventory
              </NavLink>
            </li>
          )}
          {!!state?.showResearch && (
            <li>
              <NavLink
                to="/research"
                className="[&.active]:border-b-2 hover:border-b-2 hover:border-b-white"
              >
                Research
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
