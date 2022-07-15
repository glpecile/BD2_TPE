import Image from "next/image";
import Link from "next/link";

interface props {
    size: string;
}

export const BrandLogo = (props: props) => {
    return (
        <Link href={'/'}>
            <a>
                <Image src={'/../public/images/Maverick-logo.webp'} alt="Maverick_logo" height={props.size}
                       width={props.size}/>
            </a>
        </Link>
    );
}