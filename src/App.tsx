import React, {useEffect, useState} from 'react';
import {useRoutes} from "./hooks/useRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./components/Header";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import theme from "./styles/theme";
import {Footer} from "./components/Footer";
import {initializeApp} from "firebase/app";
import {FIREBASE_CONFIG} from "./firebase";
import {get, getDatabase, ref as databaseRef} from "firebase/database";
import {Loader} from "./components/Loader";
import {DB} from "./db/types";
import {Helmet} from "./components/Helmet";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 16px;
    min-height: 100%;
  }

  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    box-sizing: border-box;
    margin: 0;
    position: relative;
    text-rendering: optimizeLegibility;
    background-color: ${({theme}) => theme.backgroundColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      background: ${({theme}) => theme.backgroundColor};
      width: 0.4em;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({theme}) => theme.scrollBar};
    }

    &.side-bar-opened {
      overflow: hidden;
    }
  }

  * {
    box-sizing: border-box;
    list-style: none;
  }

  img {
    max-width: 100%;
  }
`;

export const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);

export const DBContext = React.createContext<DB | null>(null);

function App() {
    const routes = useRoutes();
    const [loader, setLoader] = useState(true);
    const [state, setState] = useState(null);
    const database = getDatabase(FIREBASE_APP);

    useEffect(() => {
        try {
            get(databaseRef(database)).then(response => {
                setState(response.val())
                setLoader(false);
            });
        } catch {
            setState(null)
        }
    }, []);

    return (
        <DBContext.Provider value={state}>
            <ThemeProvider theme={theme}>
                <GlobalStyles/>
                {loader ?
                    <Loader/> :
                    <Router>
                        <Helmet/>
                        <Header/>
                        {routes}
                        <Footer/>
                    </Router>
                }
            </ThemeProvider>
        </DBContext.Provider>
    );
}

export default App;
