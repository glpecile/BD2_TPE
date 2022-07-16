import React from "react";
import {ErrorMessage, Field} from "formik";

interface Props {
    name: string,
    placeholder: string
}

export const CustomField: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Field placeholder={props.placeholder} name={props.name} className="form"/>
            <ErrorMessage name={props.name} component="span" className="error-message"/>
        </>
    );
}