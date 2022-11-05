import { useState } from "react";

import Login from "./components/Login";
import Configure from "./components/Configure";
import Persons from "./components/Persons";
import { UserProvider, useUser } from "./components/UserProvider";

export function App() {
  const { user } = useUser();

  const [screen, setScreen] = useState<"login" | "configure" | "main">(
    user?.personProps ? "main" : user ? "configure" : "login"
  );

  return (
    <>
      <UserProvider>
        {screen === "login" ? (
          <Login next={() => setScreen("configure")} />
        ) : screen === "configure" ? (
          <Configure next={() => setScreen("main")} />
        ) : (
          <Persons
            setScreen={(screen) =>
              setScreen(screen as "login" | "configure" | "main")
            }
          />
        )}
      </UserProvider>
    </>
  );
}
