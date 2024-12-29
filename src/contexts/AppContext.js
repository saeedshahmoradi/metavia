import { createContext } from "react";


const AppContext = createContext({
  team: [],
  handleFullScreenMode: () => {},
});

export default AppContext;