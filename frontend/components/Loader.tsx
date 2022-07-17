import {FC} from "react";
import Image from "next/image";

export const Loader: FC = () => {
    return (
        <Image src={'/images/puff.svg'} alt="loader" height="128rem" width="128rem"/>
    )
}