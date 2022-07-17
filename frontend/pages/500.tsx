import {NextPage} from "next";
import {Layout} from "../components/Layout";
import {DisplayError} from "../components/DisplayError";

const Error500: NextPage = () => {
    return (<Layout>
        <div className="flex flex-col">
            <DisplayError title="Error 500"/>
        </div>
    </Layout>)
}

export default Error500;