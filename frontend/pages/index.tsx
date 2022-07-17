import Head from 'next/head'
import Navbar from "../components/Navbar";
import AddIcon from '@mui/icons-material/Add';
import type {NextPage} from 'next'
import {useState} from "react";
import {Overlay} from "../components/Shorten/Overlay";
import {Card} from "../components/Shorten/Card";
import Image from "next/image";
import {NoLinks} from "../components/Shorten/NoLinks";

interface ShortenedUrl {
    url: string,
    shortUrl: string,
    clicks: number,
}

const DUMMY_DATA: ShortenedUrl[] = [
    {
        shortUrl: "shorty",
        url: "https://www.google.com",
        clicks: 100,
    },
    {
        shortUrl: "123456789000",
        url: "https://www.yahoo.com",
        clicks: 2,
    },
    {
        shortUrl: "bae",
        url: "https://www.duckduckgo.com",
        clicks: 25,
    },
    {
        shortUrl: "cunt",
        url: "https://www.bing.com",
        clicks: 12,
    },
];

const Home: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex min-h-screen flex items-center justify-center py-2 bg">
                <Head>
                    <title>Maverick • Link Shortener</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta name={'description'} content={'Shorten links on the fly.'}/>
                </Head>

                <Navbar/>

                <main className="flex w-full container mx-auto flex-1 flex-col items-center justify-center px-24 text-center">
                    <div className="flex flex-wrap w-full justify-between space-y-4 lg:mt-0 mt-8">
                        <h1 className="text-6xl font-bold">
                            Maverick
                        </h1>
                        <button className="shorten-button text-slate-50" onClick={() => setIsOpen(!isOpen)}>
                            <AddIcon className="pb-1"/><span className="pr-1.5">Add a link</span>
                        </button>
                    </div>

                    <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}/>

                    <div className="mt-6 mb-24 md:mb-0 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                        {
                            DUMMY_DATA.length > 0 ?
                                DUMMY_DATA.map((url) => {
                                    return <Card key={url.url} url={url.url} shortUrl={url.shortUrl} clicks={url.clicks}/>
                                }) : <NoLinks/>
                        }
                    </div>
                </main>
            </div>
        </>
    )
}

export default Home
