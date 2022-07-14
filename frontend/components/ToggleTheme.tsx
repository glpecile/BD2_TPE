import {useTheme} from "next-themes";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ToggleTheme = () => {
    const {theme, setTheme} = useTheme();
    return (<button className="transition-all ease-linear" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? < DarkModeIcon/> : <LightModeIcon/>}
    </button>);
}