import { FC, ReactNode, createContext, useState } from "react";

export type Auth = {
  accessToken: string;
  storeAccessToken: (accessToken: string) => void;
};

const initialValue = { accessToken: "", storeAccessToken: () => {} };

export const AuthContext = createContext<Auth>(initialValue);

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  const storeAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
  };

  return (
    <AuthContext.Provider value={{ accessToken, storeAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
