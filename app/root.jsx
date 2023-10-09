import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import stylesheet from "./tailwind.css";

export const links = () => [{ rel: "stylesheet", href: stylesheet }];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-gray-500">
        <h1 className="dark:text-white">Zombie Idler</h1>
        <Outlet />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
