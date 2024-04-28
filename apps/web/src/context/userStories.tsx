import { PropsWithChildren, createContext, useContext } from "react";
import { GetUserStoriesResult } from "@src/services/user/stories";
import { defaultUserStoriesQueryString, useGetUserStoriesQuery } from "@src/store/apiSlice/userStoriesApi";
import { authTokenContext } from "./authTokens";


interface initalValue {
    data: GetUserStoriesResult["stories"] | undefined
    isFetching: boolean
}

// context used to provide
export const userStoriesContext = createContext({ data: [], isFetching: false } as initalValue);



export const UserStoriesProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { isLoggedIn } = useContext(authTokenContext);
    const { data, isFetching } = useGetUserStoriesQuery(defaultUserStoriesQueryString, { skip: isLoggedIn === false })

    return (
        <userStoriesContext.Provider value={{ data, isFetching }}>
            {children}
        </userStoriesContext.Provider>
    )
}