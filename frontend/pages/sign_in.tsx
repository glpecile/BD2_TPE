import {NextPage} from "next";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import {BrandLogo} from "../components/BrandLogo";
import {PasswordField} from "../components/Forms/PasswordField";
import {LoginSchema} from "../components/Forms/LoginSchema";
import {EmailField} from "../components/Forms/EmailField";

interface Values {
    email: string;
    password: string;
}

const Sign_in: NextPage = () => {
    const router = useRouter();
    const initialValues: Values = {
        email: "",
        password: "",
    }

    return <div className="flex flex-col mx-auto items-center justify-center p-10 bg-slate-100 dark:bg-slate-900 h-screen">
        <Head>
            <title>Maverick • Sign In</title>
        </Head>
        <BrandLogo size="128rem"/>
        <h1 className="text-3xl font-bold">Sign In And Start Shortening Links!</h1>
        <p className="my-2">Don't have an account?{' '}
            <Link href={'/sign_up'}>
                <span className="cursor-pointer underline hover:text-brand_primary dark:hover:text-brand_secondary">Sign Up!</span>
            </Link>
        </p>
        <div
            className="flex transition-all ease-in-out break-all space-y-2.5 flex-col container justify-center max-w-md max-h-fit my-4 p-8 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg">
            <Formik initialValues={initialValues}
                    onSubmit={(values: Values) => {
                        // TODO: api call
                        console.log(values);
                        router.push("/");
                    }}
                    validationSchema={LoginSchema}>
                <Form className="space-y-8">
                    <EmailField name="email" placeholder="Email"/>
                    <PasswordField name="password" placeholder="Password"/>
                    <button className="rounded-full bg-brand_primary p-2.5 w-full text-white hover:bg-blue-600" type="submit">Log in</button>
                </Form>
            </Formik>
        </div>
    </div>
}

export default Sign_in;