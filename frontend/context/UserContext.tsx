import React, {createContext, useContext, useMemo, useState} from "react";
import jwt_decode, {JwtPayload} from "jwt-decode";
import {api} from "../api/api";

interface UserContextInterface {
    isLoggedIn: boolean,
    onLogout: () => void,
    onLogin: (token: string, username: string) => void,
    authKey: string | null,
    username: string | undefined,
}

type Props = {
    children?: React.ReactNode
};

// context
export const UserContext = createContext({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (token: string, username: string) => {
    },
    authKey: '',
    username: '',
} as UserContextInterface);

// provider
export const UserContextProvider: React.FC<Props> = ({children}) => {
    const isInLocalStorage = typeof window !== 'undefined' ? localStorage.hasOwnProperty("token") : false;
    const isInSessionStorage = typeof window !== 'undefined' ? sessionStorage.hasOwnProperty("token") : false;
    const [isLoggedIn, setLoggedIn] = useState(isInLocalStorage || isInSessionStorage);
    let token = isInLocalStorage ? localStorage.getItem("token") : isInSessionStorage ? sessionStorage.getItem("token") : "";
    (token) ? token = JSON.parse(token) : token = "";
    api.defaults.headers.common['Authorization'] = `Bearer ${token || ''}`;
    const [authKey, setAuthKey] = useState(token);

    const [username, setUsername] = useState(() => {
        try {
            if (!token || !jwt_decode(token))
                return "no-user";
            return jwt_decode<JwtPayload>(token).sub;
        } catch (error) {
            if (isLoggedIn) {
                console.log(error);
            }
        }
    });

    const logoutHandler = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setLoggedIn(false);
        setAuthKey("");
        setUsername("");
    }

    const loginHandler = () => {
        setAuthKey(token);
        setUsername(username);
        setLoggedIn(true);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const values = useMemo(() => ({
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        authKey,
        username,
    }), [isLoggedIn, authKey, username]);

    return <UserContext.Provider value={values}> {children} </UserContext.Provider>;
}