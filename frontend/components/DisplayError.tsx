import React from 'react';
import Image from "next/image";
import Link from "next/link";

export const DisplayError: React.FC<{ title: string }> = (props) => {
    return (
        <div className="relative my-4">
            <h1 className="text-6xl font-bold text-center my-4">
                {props.title}
            </h1>
            <Image className="rounded-2xl" src={'/images/error.webp'} height="256rem" width="420rem"/>
            <p className="font-medium text-center">
                Go back {' '}
                <Link href="/">
                    <a className="text-brand_primary dark:text-brand_secondary hover:text-brand_secondary dark:hover:text-blue-600">home</a>
                </Link>.
            </p>
        </div>
    );
}