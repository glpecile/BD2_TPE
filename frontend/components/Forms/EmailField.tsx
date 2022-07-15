import {ErrorMessage, Field} from "formik";

interface Props {
    name: string,
    placeholder: string
}

export const EmailField = (props: Props) => {
    return (
        <>
            <Field placeholder={props.placeholder} name={props.name} className="form"/>
            <ErrorMessage name={props.name} component="span" className="error-message"/>
        </>
    );
}