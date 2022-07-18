import LogoutIcon from '@mui/icons-material/Logout';
import React, {FC, useContext} from "react";
import {ToggleTheme} from "./ToggleTheme";
import {BrandLogo} from "./BrandLogo";
import {useRouter} from "next/router";
import {UserContext} from "../context/UserContext";
import {ConfirmationDialog} from "./ConfirmationDialog";

const Navbar: React.FC = () => {
    const router = useRouter();
    const userContext = useContext(UserContext);
    const [isOpen, setIsOpen] = React.useState(false);

    const onLogout = () => {
        setIsOpen(false);
        userContext.onLogout();
        router.push('/sign_in');
    }

    return (<nav
        className="fixed py-4 px-6 z-10 justify-between items-center bottom-0 w-full h-[6rem] md:w-[7.15rem] md:top-0 md:left-0 flex md:flex-col md:h-full card-bg bg-opacity-50 backdrop-blur">

        <ConfirmationDialog isOpen={isOpen} onClose={() => {
            setIsOpen(false)
        }} onConfirm={onLogout} title="Log Out" description="Are you sure you'd like to log out?"/>

        <BrandLogo size="72rem"/>
        <div className="flex md:flex-col items-center justify-center space-x-8 md:space-x-0 md:space-y-8">
            <NavbarIcon icon={<ToggleTheme/>} text="Change Theme"/>
            <NavbarIcon icon={<LogoutIcon onClick={() => {
                setIsOpen(true)
            }} className="cursor-pointer sidebar-icon" fontSize="large"/>} text="Logout"/>
        </div>
    </nav>);
}

interface Props {
    icon?: React.ReactNode
    text: string
}

const NavbarIcon: FC<Props> = (props) => {
    return (<div className="relative rounded-full p-3 hover:bg-gray-600/50 transition-all origin-center duration-200 group">
        {props.icon}
        <span
            className="absolute w-auto p-2 min-w-max bottom-12 -left-8 md:bottom-2.5 md:left-16 text-white rounded-md shadow-md bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-bottom md:origin-left group-hover:scale-100">
            {props.text}
        </span>
    </div>)
}

export default Navbar;