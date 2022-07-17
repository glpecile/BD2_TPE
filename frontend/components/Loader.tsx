import {FC} from "react";
import Image from "next/image";

export const Loader: FC = () => {
    return (
        <div className="shadow-xl rounded-full">
            <Image className="fill-black" src={'/images/puff.svg'} alt="loader" height="128rem" width="128rem"/>
        </div>
    )
}