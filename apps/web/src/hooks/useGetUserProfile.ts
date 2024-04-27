import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"

import { authTokenContext } from "@src/context/authTokens"
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors"
import { getUserProfileService } from "@src/services/user/profile"
import { updateUserProfile } from "@src/store/slices/userProfile"


/**
 * fetch user profile and update in redux store when user is authenticated
 */
const useGetUserProfile = () => {

    const { logout, isLoggedIn } = useContext(authTokenContext);
    const dispatch = useDispatch();


    useEffect(() => {
        const call = async () => {
            const result = await getUserProfileService()

            switch (true) {
                case (result instanceof CanceledError):
                    return

                case (result instanceof UnauthorizedError):
                    logout();
                    // please login again toast here
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