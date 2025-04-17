import { createContext } from "react";


const AppContext = createContext({
  team: [],
  fullScreen: false,
  handleFullScreenMode: () => {},
  language: 'en',
  t: () => {},
});

export default AppContext;