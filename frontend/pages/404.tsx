import {NextPage} from "next";
import {Layout} from "../components/Layout";
import {DisplayError} from "../components/DisplayError";

const Error404: NextPage = () => {
    return (<Layout>
        <div className="flex flex-col">
            <DisplayError title="Error 404"/>
        </div>
    </Layout>)
}

export default Error404;