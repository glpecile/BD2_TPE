import React, {Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";

interface Props {
    message: string,
    isOpen: boolean,
    onClose: () => void
}

export const TimeoutAlert: React.FC<Props> = (props: Props) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.onClose();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [props.isOpen]);

    return <Transition appear show={props.isOpen} as={Fragment}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <span
                className="z-10 absolute card-bg inset-x-0 bottom-0 p-6 max-w-md sm:max-w-xl md:max-w-2xl mx-auto mb-4 border-t-4 border-t-green-500 rounded">{props.message}</span>
        </Transition.Child>
    </Transition>;
}