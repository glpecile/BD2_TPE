import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Try a password longer than 8 characters'),
})