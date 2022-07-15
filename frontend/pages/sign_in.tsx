import * as Yup from 'yup'
import Head from "next/head";
import Link from "next/link";
import {NextPage} from "next";
import {Formik, Form} from "formik";
import {useRouter} from "next/router";
import {BrandLogo} from "../components/BrandLogo";
import {PasswordField} from "../components/Forms/PasswordField";
import {CustomField} from "../components/Forms/CustomField";

interface Values {
    email: string;
    password: string;
}

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email.').required('Required field.').matches(/[^<\/>]/, "Invalid pattern."),
    password: Yup.string().required('Required field.').min(8, 'Passwords are usually longer than 8 characters.').matches(/[^<\/>]/, "Invalid pattern."),
})

const Sign_in: NextPage = () => {
    const router = useRouter();
    const initialValues: Values = {
        email: "",
        password: "",
    }

    return <div className="form-bg">
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
        <div className="form-card">
            <Formik initialValues={initialValues}
                    onSubmit={(values: Values) => {
                        // TODO: api call
                        console.log(values);
                        router.push("/");
                    }}
                    validationSchema={SignInSchema}>
                <Form className="space-y-8">
                    <CustomField name="email" placeholder="Email*"/>
                    <PasswordField name="password" placeholder="Password*"/>
                    <button className="form-button" type="submit">Log in</button>
                </Form>
            </Formik>
        </div>
    </div>
}

export default Sign_in;