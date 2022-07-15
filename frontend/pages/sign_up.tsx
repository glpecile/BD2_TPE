import {NextPage} from "next";
import Head from "next/head";
import {BrandLogo} from "../components/BrandLogo";
import Link from "next/link";
import {Form, Formik} from "formik";
import {EmailField} from "../components/Forms/EmailField";
import {PasswordField} from "../components/Forms/PasswordField";
import {useRouter} from "next/router";
import * as Yup from "yup";

interface Values {
    email: string;
    repeatedEmail: string;
    password: string;
    repeatedPassword: string;
}

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email.').required('Required field.'),
    repeatedEmail: Yup.string().email('Please enter a valid email.').required('Required field.').oneOf([Yup.ref('email'), null], 'Emails must match.'),
    password: Yup.string().required('Required field.').matches(/[^<\/>](?=.*[A-Za-z\d])[A-Za-z\d@$!%*#?&_-]{7,}/, "Include at least one Uppercase and up to 8 characters."),
    repeatedPassword: Yup.string().required('Required field.').oneOf([Yup.ref('password'), null], 'Passwords must match.').matches(/[^<\/>]/, "Invalid pattern."),
})

const Sign_up: NextPage = () => {
    const router = useRouter();
    const initialValues: Values = {
        email: "",
        repeatedEmail: "",
        password: "",
        repeatedPassword: "",
    }

    return <div className="form-bg">
        <Head>
            <title>Maverick • Sign Up</title>
        </Head>
        <BrandLogo size="128rem"/>
        <h1 className="text-3xl font-bold">Sign Up Now And Start Shortening!</h1>
        <p className="my-2">Already have an account?{' '}
            <Link href={'/sign_in'}>
                <span className="cursor-pointer underline hover:text-brand_primary dark:hover:text-brand_secondary">
                    Sign In!
                </span>
            </Link>
        </p>
        <div className="form-card">
            <Formik initialValues={initialValues}
                    onSubmit={(values: Values) => {
                        // TODO: api call
                        console.log(values);
                        router.push("/");
                    }}
                    validationSchema={SignUpSchema}>
                <Form className="space-y-8">
                    <EmailField name="email" placeholder="Email*"/>
                    <EmailField name="repeatedEmail" placeholder="Repeat Email*"/>
                    <PasswordField name="password" placeholder="Password*"/>
                    <PasswordField name="repeatedPassword" placeholder="Repeat Password*"/>
                    <ul role="list" className="pl-3 list-disc text-xs marker:text-brand_secondary">
                        <li>Passwords must be at least 8 characters long.</li>
                        <li>Passwords must contain at least one Uppercase letter or Number.</li>
                    </ul>
                    <button className="form-button" type="submit">Sign Up</button>
                </Form>
            </Formik>
        </div>
    </div>
}

export default Sign_up;