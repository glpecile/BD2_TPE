import TwitterIcon from '@mui/icons-material/Twitter';
import QrCodeIcon from '@mui/icons-material/QrCode';
import FacebookIcon from '@mui/icons-material/Facebook';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useState} from "react";
import {WhatsApp} from "@mui/icons-material";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TimeoutAlert} from "../TimeoutAlert";

interface Props {
    url: string,
    shortUrl: string,
    clicks: number,
}

export const Card: React.FC<Props> = (props: Props) => {
    const [isCopied, setIsCopied] = useState(false);

    return (<>
            <TimeoutAlert message="Link copied successfully!" isOpen={isCopied} onClose={() => setIsCopied(false)}/>

            <div
                className="relative w-96 card-bg hover:bg-blue-50 dark:hover:bg-blue-100/10 transition-all ease-in-out duration-100 rounded-2xl p-6 m-3 space-y-1.5 flex flex-col items-start">
                <CopyToClipboard text={props.shortUrl} onCopy={() => setIsCopied(true)}>
                    <h1 className={"cursor-pointer hover:underline text-3xl font-bold"} title={"Copy " + props.shortUrl + " to clipboard"}>
                        {props.shortUrl}
                    </h1>
                </CopyToClipboard>

                <DeleteIcon className={"cursor-pointer hover:text-red-500 dark:hover:text-red-400 absolute top-5 right-5"}/>
                <a href={props.url}><code className="text-sm">
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