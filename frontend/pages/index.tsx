import Head from 'next/head'
import AddIcon from '@mui/icons-material/Add';
import type {NextPage} from 'next'
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Overlay} from "../components/Shorten/Overlay";
import {Card} from "../components/Shorten/Card";
import {NoLinks} from "../components/Shorten/NoLinks";
import {UserContext} from "../context/UserContext";
import {useRouter} from "next/router";
import {Loader} from "../components/Loader";
import {Layout} from "../components/Layout";
import {urlShortenApi} from "../api/urlShortenApi";
import {ShortUrl} from "../api/urlShortenApi";
import {TimeOutAlert} from "../components/TimeOutAlert";

const Home: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [linkData, setLinkData] = useState<ShortUrl[] | undefined>(undefined);
    const userContext = useContext(UserContext);
    const router = useRouter();
    const mountedUser = useRef(true);
    const [error, setError] = useState<boolean>(false);
    const [toDelete, setToDelete] = useState(false);

    useEffect(() => {
        if (!userContext.isLoggedIn) {
            router.push("/sign_in");
        }
    }, []);

    const fetchLinks = useCallback(async (id: number) => {
        if (!mountedUser.current)
            return
        try {
            const fetchedLinks = await urlShortenApi.getUrlsByUser({userId: id, sort: 'date', order: 'desc'});
            setLinkData(fetchedLinks.data)
        } catch (e) {
            setError(true);
        }
    }, [])

    useEffect(() => {
        mountedUser.current = true;
        const id = userContext.id
        if (id)
            fetchLinks(id);
        if (toDelete) {
            setToDelete(false);
        }
        return () => {
            mountedUser.current = false;
        }
    }, [userContext.id, !isOpen, toDelete])

    return (
        <Layout>
            <Head>
                <title>Maverick • Link Shortener</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name={'description'} content={'Shorten links on the fly.'}/>
            </Head>

            <TimeOutAlert alertColor="border-t-red-500" message="Oops! Something went wrong." isOpen={error} onClose={() => {
                setError(false)
            }}/>

            <main className="flex w-full container mx-auto flex-1 flex-col items-center justify-center px-24 text-center">
                {
                    (linkData) ?
                        <>
                            <div className="flex flex-wrap w-full justify-between space-y-4 lg:mt-0 mt-8">
                                <h1 className="text-6xl font-bold">
                                    Maverick
                                </h1>
                                <button className="shorten-button text-slate-50" onClick={() => setIsOpen(!isOpen)}>
                                    <AddIcon className="pb-1"/><span className="pr-1.5">Add a link</span>
                                </button>
                            </div>

                            <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}/>

                            <div
                                className="transition-all ease-in-out duration-300 origin-center gap-4 mt-6 mb-24 md:mb-0 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                                {
                                    linkData.length > 0 ?
                                        linkData.map((data) => {
                                            return <Card onDelete={() => {
                                                setToDelete(true)
                                            }} key={data.alias} alias={data.alias} url={data.url} clicks={data.clicks} date={data.date}/>
                                        }) : <NoLinks/>
                                }
                            </div>
                        </> : <Loader/>
                }
            </main>
        </Layout>
    )
}

export default Home
