import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react'
import React from 'react'

import stylesheet from './tailwind.css'
import { Provider } from './utils/gameContext'

export const links = () => [{ rel: 'stylesheet', href: stylesheet }]

export default function App() {
  return (
    <html className="dark:text-white">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-gray-700 h-full w-full pt-5 pl-5">
        <Provider>
          <Outlet />
        </Provider>

        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
