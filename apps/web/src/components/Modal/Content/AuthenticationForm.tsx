
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

import CloseCircle from "@src/assets/icons/close_circle.svg";
import ErrorMessage from "@src/components/common/ErrorMessage";
import FormInput from "@src/components/common/FormInput";
import SecondaryButton from "@src/components/common/SecondaryButton";
import { useAbortController } from "@src/hooks/useAbortController";
import { useOnline } from "@src/hooks/useOnline";
import { ApiError, CanceledError } from "@src/services/errors";
import { loginService } from "@src/services/user/login";
import { registerService } from "@src/services/user/register";

import styles from "./AuthenticationForm.module.css";


interface Iprops {
    type: "login" | "register"
    closeModal: () => void
}

const AuthenticationForm: React.FC<Iprops> = ({ type, closeModal }) => {

    const { isOnline } = useOnline();
    const { signalRef } = useAbortController();
    const [formValue, setFormValue] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    // update form value state
    const handleChange = (key: keyof typeof formValue, e: ChangeEvent<HTMLInputElement>) => setFormValue(prev => ({ ...prev, [key]: e.target.value }))

    // state variable to display error message
    const [errorMessage, setErrorMessage] = useState("");

    // prevent modal from closing when clicked anywhere inside form
    const preventClose = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => e.stopPropagation();


    // display offline message when user is offline
    useEffect(() => {
        setErrorMessage(isOnline === false ? "You are offline" : "");
    }, [isOnline])


    // validate, update errorMessage state and return validity status of form
    const isFormValid = () => {
        switch ("") {
            case (formValue.username.trim()):
                setErrorMessage("username is required");
                return false;

            case (formValue.password.trim()):
                setErrorMessage("password is required");
                return false;

            default:
                return true;
        }
    }



    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (isOnline === false) return
        if (isFormValid() === false) return

        const handleResponse = (data: any) => {
            setLoading(false);
            switch (true) {
                case (data instanceof CanceledError):
                    return;

                case (data instanceof ApiError):
                    setErrorMessage(data.message);
                    return;


                default:
                    closeModal();
                // onSubmitCallback();
            }
        }



        // check the type and call appropriate services
        setLoading(true);
        switch (type) {
            // for login modal use login service
            case ("login"):
                loginService({ payload: formValue, signal: signalRef.current.signal }).then(handleResponse)
                return;

            // for register modal use register service
            case ("register"):
                registerService({ payload: formValue, signal: signalRef.current.signal }).then(handleResponse)
                return
        }
    }


    // text indicating if the form is for login or registeration
    const formType = type === "login" ? "Login" : "Register"

    return (
        <form onSubmit={handleSubmit} className={styles.form} onClick={preventClose}>

            {/* form closing button */}
            <button className={styles.close_button} onClick={closeModal} type="button">
                <img src={CloseCircle} alt="" />
            </button>

            {/* form header */}
            <h1 className={styles.header}>{formType} to SwipTory</h1>

            {/* username input */}
            <FormInput label="Username" placeholder="Enter username" type="text" inputContainerClassName={styles.input}
                value={formValue.username} handleChange={e => handleChange("username", e)} />

            {/* password input */}
            <FormInput label="Password" placeholder="Enter password" type="password" inputContainerClassName={styles.input}
                value={formValue.password} handleChange={e => handleChange("password", e)}
                containerClassName={styles.password_container} />


            {/* form error message */}
            <ErrorMessage errorMessage={errorMessage} className={styles.errorMessage} />

            {/* submit button */}
            <SecondaryButton children={formType} type="submit" className={`${styles.submit_button} ${errorMessage ? styles.errorMessage : ""}`}
                disabled={loading} />
        </form>
    );
}

export default AuthenticationForm;