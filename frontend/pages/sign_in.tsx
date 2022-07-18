import * as Yup from 'yup'
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {PasswordField} from "../components/Forms/PasswordField";
import {CustomField} from "../components/Forms/CustomField";
import {TimeOutAlert} from "../components/TimeOutAlert";
import {UserContext} from "../context/UserContext";
import {NextPage} from "next";
import {Formik, Form} from "formik";
import {useRouter} from "next/router";
import {userApi} from "../api/userApi";
import {User} from "../api/userApi";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email.').required('Required field.').matches(/[^<\/>]/, "Invalid pattern."),
    password: Yup.string().required('Required field.').min(8, 'Passwords are usually longer than 8 characters.').matches(/[^<\/>]/, "Invalid pattern."),
})

const Sign_in: NextPage = () => {
    const router = useRouter();
    const userContext = useContext(UserContext);
    const initialValues: User = {
        email: "",
        password: "",
    }
    const [userToLogin, setUserToLogin] = useState<User | undefined>(undefined);
    const mountedUser = useRef(true);
    const [error, setError] = useState<boolean>(false);

    const logInUser = useCallback(async (userToLogin: User) => {
        if (!mountedUser.current) {
            return;
        }
        try {
            const res = await userApi.logInUser(userToLogin);
            localStorage.setItem("token", JSON.stringify(res.data.access_token));
            userContext.onLogin(res.data.access_token, userToLogin.email);
        } catch (e: Response | any) {
            setError(true);
            return;
        }
        router.replace("/");
    }, []);

    useEffect(() => {
        mountedUser.current = true;
        if (userToLogin !== undefined) {
            logInUser(userToLogin);
        }
        return () => {
            mountedUser.current = false;
        }
    }, [userToLogin]);

    return <div className="form-bg">
        <Head>
            <title>Maverick • Sign In</title>
        </Head>

        <TimeOutAlert alertColor="border-t-red-500" message="Invalid email or password." isOpen={error} onClose={() => {
            setError(false)
        }}/>

        <Image src={'/images/Maverick-logo.webp'} alt="Maverick_logo" height={"128rem"} width={"128rem"}/>
        <h1 className="text-3xl font-bold my-2">Sign In And Start Shortening Links!</h1>
        <p className="my-2">Don't have an account?{' '}
            <Link href={'/sign_up'}>
                <span className="cursor-pointer underline hover:text-brand_primary dark:hover:text-brand_secondary">Sign Up!</span>
            </Link>
        </p>
        <div className="form-card">
            <Formik initialValues={initialValues}
                    onSubmit={(values: User) => {
                        setUserToLogin(values);
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