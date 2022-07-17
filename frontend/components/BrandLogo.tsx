import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    size: string;
}

export const BrandLogo: React.FC<Props> = (props: Props) => {
    return (
        <Link href={'/'}>
            <a className="sidebar-icon">
                <Image src={'/images/Maverick-logo.webp'} alt="Maverick_logo" height={props.size}
                       width={props.size}/>
            </a>
        </Link>
    );
}