import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {ShortUrl} from "../../api/urlShortenApi";
import QRCode from "react-qr-code";


interface Props extends ShortUrl {
    isOpen: boolean,
    onClose: () => void
}

export const QrOverlay: React.FC<Props> = (props: Props) => {

    return (
        <>

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
                                        Qr Code • {props.alias}
                                    </Dialog.Title>
                                    <div className="flex justify-center items-center p-4">
                                        <QRCode value={`${process.env.NEXT_PUBLIC_FRONT_URL}/r/${props.alias}`}/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}