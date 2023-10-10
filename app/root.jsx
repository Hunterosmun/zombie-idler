import {
  Links,
  Link,
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
      <body className="dark:bg-gray-500 h-full w-full">
        <h1 className="dark:text-white">Zombie Idler</h1>
        <nav className="w-full">
          <ul className="flex justify-evenly">
            <li className="hover:border-b-2 hover:border-b-white">
              <Link to="/home">Home</Link>
            </li>
            <li className="hover:border-b-2 hover:border-b-white">
              <Link to="/caseysPlace">Casey's House</Link>
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
