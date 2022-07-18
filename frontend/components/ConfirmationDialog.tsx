import React, {FC, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    description: string,
}

export const ConfirmationDialog: FC<Props> = (props) => {
    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"/>
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="card-bg w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                                    {props.title}
                                </Dialog.Title>
                                <p className="p-6">{props.description}</p>
                                <div className="flex justify-between flex-wrap">
                                    <button className="rounded-full p-3 text-blue-600 dark:text-brand_secondary transition-all ease-in-out duration-300 hover:bg-slate-500/25" onClick={props.onClose}>
                                        Cancel
                                    </button>
                                    <button className="rounded-full p-3 bg-brand_primary text-white transition-all ease-in-out duration-300 hover:bg-blue-400" onClick={props.onConfirm}>
                                        Confirm
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}