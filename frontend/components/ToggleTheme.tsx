import {useTheme} from "next-themes";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useState, useEffect} from 'react'

export const ToggleTheme = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (<button className="transition-all duration-300 ease-linear" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <DarkModeIcon/> : <LightModeIcon/>}
    </button>);
}