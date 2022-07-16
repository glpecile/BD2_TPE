import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ToggleTheme} from "./ToggleTheme";
import {BrandLogo} from "./BrandLogo";

const Navbar = () => {
    return (<nav className="fixed p-2 px-6 z-10 justify-between items-center bottom-0 w-full md:w-[7.15rem] md:top-0 md:left-0 flex md:flex-col md:h-full card-bg bg-opacity-50 backdrop-blur">
        <BrandLogo size="72rem"/>
        <div className="flex md:flex-col items-center justify-center my-4 space-x-8 md:space-x-0 md:space-y-8">
            <ToggleTheme/>
            {
                // TODO Logged in conditional
                <Link href={'/sign_in'}>
                    <AccountCircleIcon className="cursor-pointer sidebar-icon" fontSize="large"/>
                </Link>
            }
        </div>
    </nav>);
}

export default Navbar;