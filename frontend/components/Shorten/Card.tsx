import TwitterIcon from '@mui/icons-material/Twitter';
import QrCodeIcon from '@mui/icons-material/QrCode';
import FacebookIcon from '@mui/icons-material/Facebook';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useCallback, useRef, useState} from "react";
import {WhatsApp} from "@mui/icons-material";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TimeOutAlert} from "../TimeOutAlert";
import {ShortUrl, urlShortenApi} from "../../api/urlShortenApi";
import {ConfirmationDialog} from "../ConfirmationDialog";

interface Props extends ShortUrl {
    onDelete: () => void
}

export const Card: React.FC<Props> = (props) => {
    const [isCopied, setIsCopied] = useState(false);
    const mounted = useRef(true);
    const [error, setError] = useState<boolean>(false);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

    const handleDelete = useCallback(async (data: ShortUrl) => {
        if (!mounted.current)
            return
        try {
            await urlShortenApi.deleteUrl(data);
            props.onDelete();
            setConfirmationOpen(false);
        } catch (e) {
            setError(true);
            return;
        }
    }, [])

    const handleConfirmation = () => {
        handleDelete(props);
        setConfirmationOpen(false);
    }

    return (<>
            <TimeOutAlert alertColor="border-t-green-500" message="Link copied successfully!" isOpen={isCopied} onClose={() => setIsCopied(false)}/>
            <TimeOutAlert alertColor="border-t-red-500" message="Error occurred while deleting link!" isOpen={error} onClose={() => setError(false)}/>
            <ConfirmationDialog isOpen={confirmationOpen} onClose={() => {setConfirmationOpen(false)}} onConfirm={handleConfirmation} title={`Delete`} description={`Are you sure you want to delete ${props.alias}? You can't undo this.`}/>
            <div
                className="relative w-96 h-44 ring-0 ring-offset-8 ring-offset-slate-50 dark:ring-offset-slate-800 truncate text-left card-bg hover:bg-blue-50 dark:hover:bg-blue-100/10 transition-all ease-in-out duration-100 rounded-2xl p-6 m-3 space-y-1.5 flex flex-col items-start">
                <CopyToClipboard text={`${process.env.NEXT_PUBLIC_FRONT_URL}/r/${props.alias}`} onCopy={() => setIsCopied(true)}>
                    <h1 className={"cursor-pointer hover:underline hover:underline-offset-2 text-3xl font-bold"}
                        title={"Copy " + props.alias + " to clipboard"}>
                        {props.alias}
                    </h1>
                </CopyToClipboard>
                <DeleteIcon onClick={() => {
                    setConfirmationOpen(true);
                }} className={"cursor-pointer hover:text-red-500 dark:hover:text-red-400 absolute top-5 right-5"}/>
                <a href={props.url} title={props.url}><code className="text-sm text-ellipsis overflow-ellipsis">
                    {props.url}
                </code></a>
                <p className="text-sm text-sky-600 dark:text-brand_secondary">
                    <b>{props.clicks}</b> clicks
                </p>
                <div className="flex space-x-1.5">
                    <QrCodeIcon className={"cursor-pointer hover:text-violet-500 dark:hover:text-violet-300"}/>
                    <TwitterIcon className={"cursor-pointer hover:text-sky-500 dark:hover:text-sky-300"}/>
                    <FacebookIcon className={"cursor-pointer hover:text-blue-600 dark:hover:text-blue-500"}/>
                    <WhatsApp className={"cursor-pointer hover:text-green-500 dark:hover:text-green-300"}/>
                </div>
            </div>
        </>
    )
}