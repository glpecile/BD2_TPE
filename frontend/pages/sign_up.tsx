import * as Yup from "yup";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {Form, Formik} from "formik";
import {CustomField} from "../components/Forms/CustomField";
import {PasswordField} from "../components/Forms/PasswordField";
import {useRouter} from "next/router";
import {userApi} from "../api/userApi";
import {TimeOutAlert} from "../components/TimeOutAlert";

interface Values extends User {
    repeatedEmail: string;
    repeatedPassword: string;
}

interface User {
    email: string;
    password: string;
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
    const [userToRegister, setUserToRegister] = useState<User | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const mountedUser = useRef(true);

    const registerUser = useCallback(async (userToRegister: User) => {
        if (!mountedUser.current) {
            return;
        }
        try {
            await userApi.createUser(userToRegister);
        } catch (e: Response | any) {
            setError(true);
            return;
        }
        setSuccess(true);
        const timeout = setTimeout(() => {
            router.push("/sign_in");
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        mountedUser.current = true;
        if (userToRegister !== undefined) {
            registerUser(userToRegister);
        }
        return () => {
            mountedUser.current = false;
        }
    }, [userToRegister]);

    return <div className="form-bg">
        <Head>
            <title>Maverick • Sign Up</title>
        </Head>

        <TimeOutAlert message="You are now registered! Please proceed to sign in to your account." alertColor="border-t-green-500" isOpen={success}
                      onClose={() => {
                          setSuccess(false)
                      }}/>

        <TimeOutAlert alertColor="border-t-red-500" message="The entered email is already in use." isOpen={error} onClose={() => {
            setError(false)
        }}/>

        <Image src={'/images/Maverick-logo.webp'} alt="Maverick_logo" height={"128rem"} width={"128rem"}/>

        <h1 className="text-3xl font-bold my-2">Sign Up Now And Start Shortening!</h1>
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
                        setUserToRegister(values);
                    }}
                    validationSchema={SignUpSchema}>
                <Form className="space-y-8">
                    <CustomField name="email" placeholder="Email*"/>
                    <CustomField name="repeatedEmail" placeholder="Repeat Email*"/>
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