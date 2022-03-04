import React from "react";

interface Context {
  isConnected: boolean;
  setConnected: Function;
  padCode: string;
  setPadCode: Function;
}
const AppContext = React.createContext<Context>({
  isConnected: false,
  setConnected: () => {},
  padCode: "",
  setPadCode: () => {},
});

export default AppContext;
