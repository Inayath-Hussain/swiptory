import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";

import ShowPasswordIcon from "@src/assets/icons/show_password.svg";
import styles from "./FormInput.module.css";

interface Iprops {
    label: string

    placeholder: string
    type: HTMLInputTypeAttribute

    value: string
    handleChange: ChangeEventHandler<HTMLInputElement>

    labelClassName?: string
    inputClassName?: string
    inputContainerClassName?: string
    containerClassName?: string
}


const FormInput: React.FC<Iprops> = ({
    label,
    type,
    placeholder,
    handleChange,
    value,
    inputClassName = "", labelClassName = "", containerClassName = "", inputContainerClassName = "" }) => {

    const [passwordType, setPasswordType] = useState<HTMLInputTypeAttribute>("password");

    const handleShowPassword = () => setPasswordType(prev => prev === "password" ? "text" : "password");

    let inputType = type;
    if (type === "password") inputType = passwordType

    return (
        <div className={`${styles.container} ${containerClassName}`}>
            <label htmlFor={label} className={`${styles.label} ${labelClassName}`}>{label}</label>

            <div className={`${styles.input_container} ${inputContainerClassName}`}>
                <input id={label} type={inputType} placeholder={placeholder} className={`${styles.input} ${inputClassName}`}
                    value={value} onChange={handleChange} />

                {
                    type === "password" ?
                        <button onClick={handleShowPassword} className={styles.show_password_button} type="button" >
                            <img src={ShowPasswordIcon} alt="" className={styles.show_password_image} />
                        </button>
                        :
                        null
                }
            </div>
        </div>

    );
}

export default FormInput;