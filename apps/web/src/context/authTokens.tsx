import { PropsWithChildren, createContext } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import { updateUserProfile } from "@src/store/slices/userProfile";




export const authTokenContext = createContext({
    accessToken: "", refreshToken: "", isLoggedIn: false,
    logout: () => { }
});



export const AuthTokenProvider: React.FC<PropsWithChildren> = ({ children }) => {

    // stateVariable is an array containing state variable, setter for state variable and function to remove the cookie
    const stateVariables = useCookies(["accessToken", "refreshToken"]);

    const { accessToken, refreshToken } = stateVariables[0];
    const removeCookie = stateVariables[2]

    const dispatch = useDispatch()

    const logout = () => {
        removeCookie("accessToken")
        removeCookie("refreshToken")

        // clear user info
        dispatch(updateUserProfile({ username: "", profilePicUrl: "" }))
    }

    const isLoggedIn = Boolean(accessToken || refreshToken)
    console.log(accessToken, isLoggedIn)

    return (
        <authTokenContext.Provider value={{ accessToken: accessToken || "", refreshToken: refreshToken || "", isLoggedIn, logout }}>
            {children}
        </authTokenContext.Provider>
    );
}