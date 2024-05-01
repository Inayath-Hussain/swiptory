import AuthenticationForm from "@src/components/Modal/Content/AuthenticationForm";
import useModal from "@src/hooks/useModal";
import { PropsWithChildren, createContext } from "react";


/**
 * context used to open login form modal. this context is made to simplify opening login form from different components.
 */
export const loginFormContext = createContext({ showLoginForm: () => { } })



export const LoginFormContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const { ModalPortal: LoginModalPortal, showModal: showLoginModal, hideModal: hideLoginModal } = useModal();

    return (
        <loginFormContext.Provider value={{ showLoginForm: showLoginModal }}>
            {children}

            {LoginModalPortal(<AuthenticationForm type="login" closeModal={hideLoginModal} />)}
        </loginFormContext.Provider>
    )
}