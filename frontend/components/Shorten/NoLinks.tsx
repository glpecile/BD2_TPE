import React from 'react';
import Image from "next/image";

export const NoLinks: React.FC = () => {
    return (<div className="relative my-4">
        <Image className="rounded-2xl" src={'/../public/images/no-links.webp'} height="256rem" width="420rem"/>
        <p className="text-yellow-400 bg-black/50 rounded p-px absolute bottom-16 sm:bottom-10 left-1/2 -translate-x-1/2">No links found.</p>
        <p className="font-medium">Try adding some with the <b className="text-brand_primary dark:text-brand_secondary">add a link</b> button above.</p>
    </div>);
}