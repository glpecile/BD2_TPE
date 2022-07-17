import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "next-themes";
import {UserContextProvider} from "../context/UserContext";

function MyApp({Component, pageProps}: AppProps) {
    return <UserContextProvider>
        <ThemeProvider attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    </UserContextProvider>
}

export default MyApp
