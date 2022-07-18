import React, {createContext, useMemo, useState} from "react";
import jwt_decode, {JwtPayload} from "jwt-decode";
import {api} from "../api/api";

interface UserContextInterface {
    isLoggedIn: boolean,
    onLogout: () => void,
    onLogin: (token: string, username: string) => void,
    authKey: string | null,
    username: string | undefined,
    id: number | undefined,
}

type Props = {
    children?: React.ReactNode
};

interface jwt extends JwtPayload {
    id: number;
}

// context
export const UserContext = createContext({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (token: string, username: string) => {
    },
    authKey: null,
    username: undefined,
    id: undefined,
} as UserContextInterface);

// provider
export const UserContextProvider: React.FC<Props> = ({children}) => {
    const isInLocalStorage = typeof window != 'undefined' ? localStorage.hasOwnProperty("token") : false;
    const isInSessionStorage = typeof window != 'undefined' ? sessionStorage.hasOwnProperty("token") : false;
    const [isLoggedIn, setLoggedIn] = useState(isInLocalStorage || isInSessionStorage);
    let token = isInLocalStorage ? localStorage.getItem("token") : isInSessionStorage ? sessionStorage.getItem("token") : "";
    (token) ? token = JSON.parse(token) : token = "";
    api.defaults.headers.common['Authorization'] = `Bearer ${token || ''}`;
    const [authKey, setAuthKey] = useState(token);
    const [username, setUsername] = useState(() => {
        if (!token || !jwt_decode(token))
            return undefined;
        return jwt_decode<jwt>(token).sub;
    });
    const [id, setId] = useState(() => {
        if (!token || !jwt_decode(token))
            return undefined;
        return jwt_decode<jwt>(token).id;
    });

    const logoutHandler = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setLoggedIn(false);
        setAuthKey("");
        setUsername("");
    }

    const loginHandler = (token: string, username: string) => {
        setAuthKey(token);
        token != null ? setId(jwt_decode<jwt>(token).id) : setId(undefined);
        setUsername(username);
        setLoggedIn(true);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const values = useMemo(() => ({
        onLogout: logoutHandler,
        onLogin: loginHandler,
        isLoggedIn,
        authKey,
        username,
        id,
    }), [isLoggedIn, authKey, username, id]);

    return <UserContext.Provider value={values}> {children} </UserContext.Provider>;
}