import {useState} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {ErrorMessage, Field} from "formik";

interface Props {
    name: string,
    placeholder: string
}

export const PasswordField = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="relative">
            <span onClick={handleClick} className="cursor-pointer absolute top-1.5 right-3">
                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
            </span>
            <Field name={props.name} placeholder={props.placeholder} type={showPassword ? "text" : "password"} className="form"/>
            <ErrorMessage name={props.name} component="span" className="error-message"/>
        </div>
    )
}