import { createContext, useState, useContext, useEffect } from "react";

const USER_KEY = "posthog@@user";

type User = {
  apiKey: string;
  url: string;
  personProps: string[] | undefined;
  groupProps: Record<string, string[]> | undefined;
};

type ContextValue = {
  user: User | undefined;
  updateUser: (user: User) => void;
};

const readUser = () => {
  const userData = window.localStorage.getItem(USER_KEY);

  return userData ? JSON.parse(userData) : undefined;
};

export const UserContext = createContext<ContextValue>({
  user: readUser(),
  updateUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(readUser());

  const updateUser = (values: User) => {
    setUser((user) => {
      return {
        ...(user || {}),
        ...values,
      };
    });
  };

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }, [JSON.stringify(user)]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
