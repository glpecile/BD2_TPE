import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React, {useState, useEffect} from 'react'
import {useTheme} from "next-themes";

export const ToggleTheme: React.FC = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (<button className="transition-all duration-300 ease-linear transform hover:scale-110 active:scale-95" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon/>}
    </button>);
}