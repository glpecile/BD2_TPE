import TwitterIcon from '@mui/icons-material/Twitter';
import QrCodeIcon from '@mui/icons-material/QrCode';
import FacebookIcon from '@mui/icons-material/Facebook';
import DeleteIcon from '@mui/icons-material/Delete';
import {WhatsApp} from "@mui/icons-material";

interface Props {
    url: string,
    shortUrl: string,
    clicks: number,
}

export const Card = (props: Props) => {
    return (
        <div
            className="relative w-96 card-bg hover:bg-blue-50 dark:hover:bg-blue-100/10 transition-all ease-in-out duration-100 rounded-2xl p-6 m-3 space-y-2.5 flex flex-col items-start">
            <h1 className={"cursor-pointer hover:underline text-3xl font-bold"}>
                {props.shortUrl}
            </h1>
            <DeleteIcon className={"cursor-pointer hover:text-red-400 absolute top-5 right-5"}/>
            <code className="text-sm">
                {props.url}
            </code>
            <p className="text-sm text-sky-600 dark:text-brand_secondary">
                <b>{props.clicks}</b> clicks
            </p>
            <div className="flex space-x-1.5">
                <QrCodeIcon className={"cursor-pointer hover:text-violet-300"}/>
                <TwitterIcon className={"cursor-pointer hover:text-sky-300"}/>
                <FacebookIcon className={"cursor-pointer hover:text-blue-500"}/>
                <WhatsApp className={"cursor-pointer hover:text-green-300"}/>
            </div>
        </div>
    )
}