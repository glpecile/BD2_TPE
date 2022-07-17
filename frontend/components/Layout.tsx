import {ReactNode, FC} from "react";
import Navbar from "./Navbar";

export const Layout: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <div className="flex min-h-screen flex items-center justify-center py-2 bg">
            <Navbar/>
            {children}
        </div>
    )
}