import React, {Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";

interface Props {
    message: string,
    alertColor: string,
    isOpen: boolean,
    onClose: () => void
}

export const TimeOutAlert: React.FC<Props> = (props) => {
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
            <span onClick={props.onClose} className={"z-10 absolute card-bg inset-x-0 bottom-4 p-6 max-w-md sm:max-w-xl md:max-w-2xl mx-auto mb-4 text-center rounded border-t-4 " + props.alertColor}>
                {props.message}
            </span>
        </Transition.Child>
    </Transition>;
}