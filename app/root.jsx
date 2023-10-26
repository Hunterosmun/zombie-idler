import {
  Links,
  NavLink,
  LiveReload,
  Meta,
  Outlet,
  Scripts
} from '@remix-run/react'
import React from 'react'

import stylesheet from './tailwind.css'
import { Provider } from './utils/gameContext'

export const links = () => [{ rel: 'stylesheet', href: stylesheet }]

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-gray-700 h-full w-full pt-5 pl-5">
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
            <li>
              <NavLink
                to="/inventory"
                className="[&.active]:border-b-2 hover:border-b-2 hover:border-b-white"
              >
                Inventory
                {/* (we still need to actually make this do something) */}
              </NavLink>
            </li>
          </ul>
        </nav>
        <Provider>
          <Outlet />
        </Provider>

        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
