import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"

import { authTokenContext } from "@src/context/authTokens"
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors"
import { getUserProfileService } from "@src/services/user/profile"
import { updateUserProfile } from "@src/store/slices/userProfile"
import useLoader from "./useLoader"
import { loginFormContext } from "@src/context/loginForm"


/**
 * fetch user profile and update in redux store when user is authenticated
 */
const useGetUserProfile = () => {

    const { logout, isLoggedIn } = useContext(authTokenContext);
    const dispatch = useDispatch();

    const { showLoginForm } = useContext(loginFormContext);
    const [loading, setLoading] = useState(false);

    useLoader([loading]);

    useEffect(() => {
        const call = async () => {
            setLoading(true)
            const result = await getUserProfileService()
            setLoading(false)

            switch (true) {
                case (result instanceof CanceledError):
                    return

                case (result instanceof UnauthorizedError):
                    logout();
                    toast("please login again")
                    showLoginForm();

                    return

                case (result instanceof ApiError):
                    // failed to get your profile. Please try again
                    return

                default:
                    dispatch(updateUserProfile(result))
            }
        }



        if (isLoggedIn) call();

    }, [isLoggedIn])



}

export default useGetUserProfile;