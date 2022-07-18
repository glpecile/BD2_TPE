import {useRouter} from "next/router";
import {useEffect} from "react";
import {GetServerSideProps, NextApiRequest} from "next";
import {ShortUrl, urlShortenApi} from "../../api/urlShortenApi";
import Error404 from "../404";

interface Props {
    error: boolean;
}

const AliasView = ({error}: Props) => {
    const router = useRouter()
    useEffect(() => {
        if (error) {
            router.push('/')
        }
    }, [])
    return <Error404/>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const alias = context.query.alias as string;
    let errorToReturn = {props: {error: true}};
    try {
        const response = await urlShortenApi.getUrl({alias: alias} as ShortUrl);
        console.log(response);
        return {
            redirect: {
                source: '',
                destination: `${response.data.url}`,
                permanent: false,
            }
        };
    } catch (e) {
        return errorToReturn;
    }
}

export default AliasView;
