import { ThemeProvider } from "styled-components";
import { Router } from "./routes/Router";
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export default function App () {
  return(
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <CyclesContextProvider>
         <Router />
         </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

