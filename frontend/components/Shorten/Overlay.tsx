import * as Yup from "yup";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Form, Formik} from "formik";
import {CustomField} from "../Forms/CustomField";
import {urlShortenApi} from "../../api/urlShortenApi";
import {TimeOutAlert} from "../TimeOutAlert";
import {CreateShortUrl} from "../../api/urlShortenApi";

interface Props {
    isOpen: boolean,
    onClose: () => void
}

const ShortenSchema = Yup.object().shape({
    url: Yup.string().url('Please enter a valid url to shorten.').required('Required field.').matches(/[^<\/>]/, "Invalid pattern."),
    alias: Yup.string().required('Required field.').matches(/[^<\/>][A-Za-z\d_-]{3,12}/, "A shortened URL should be between 4 and 12 valid characters."),
})

export const Overlay: React.FC<Props> = (props: Props) => {
    const initialValues: CreateShortUrl = {
        url: "",
        alias: "",
    }
    const [toShorten, setToShorten] = useState<CreateShortUrl | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const mountedUrl = useRef(true);

    const shortenLink = async (linkToShorten: CreateShortUrl) => {
        if (!mountedUrl.current) {
            return;
        }
        try {
            const res = await urlShortenApi.createUrl(linkToShorten);
            console.log(res);
        } catch (e) {
            setError(true);
            console.log(e);
            return;
        }
        setSuccess(true);
        props.onClose();
    }

    useEffect(() => {
        mountedUrl.current = true;
        if (toShorten !== undefined) {
            shortenLink(toShorten);
        }
        return () => {
            mountedUrl.current = false;
        }
    }, [toShorten]);

    return (
        <>
            <TimeOutAlert message="Congratulations! You successfully created a shortened url." alertColor="border-t-green-500" isOpen={success}
                          onClose={() => {
                              setSuccess(false)
                          }}/>

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

                    <TimeOutAlert alertColor="border-t-red-500 z-15" message="The shortened url seems to already be in use, try another one." isOpen={error}
                                  onClose={() => {
                                      setError(false)
                                  }}/>

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
                                        Add a Link
                                    </Dialog.Title>
                                    <Formik initialValues={initialValues}
                                            onSubmit={(values: CreateShortUrl) => {
                                                setToShorten(values);
                                                console.log(values);
                                            }}
                                            validationSchema={ShortenSchema}>
                                        {({values}) => (
                                            <Form className="space-y-6 mt-4">
                                                <CustomField name="url" placeholder="Url*"/>
                                                <CustomField name="alias" placeholder="Shortened url*"/>
                                                <ul role="list" className="pl-3 list-disc text-xs marker:text-brand_secondary">
                                                    <li>A valid url has the format of <code>https://something.com.</code></li>
                                                    <li>A shortened URL should be between 4 and 12 valid characters long.</li>
                                                    <li>A valid character includes any uppercase or lowercase letter, numbers and dashes.</li>
                                                </ul>
                                                <button className="form-button" type="submit">Shorten URL</button>
                                            </Form>)
                                        }
                                    </Formik>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}