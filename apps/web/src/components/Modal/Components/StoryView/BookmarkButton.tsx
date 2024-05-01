import { useContext, useMemo } from "react";

import BookmarkIcon from "@src/components/Icons/Bookmark";
import { authTokenContext } from "@src/context/authTokens";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";
import { useAddBookmarkMutation, useGetUserBookmarksQuery, useRemoveBookmarkMutation } from "@src/store/apiSlice/bookmarkApi";

import styles from "./BookmarkButton.module.css";


interface Iprops {
    story_id: string
    showLoginForm: () => void
}


const BookmarkButton: React.FC<Iprops> = ({ story_id, showLoginForm }) => {

    const { isLoggedIn } = useContext(authTokenContext);

    const [addBookmark, { isLoading: addBookmarkLoading }] = useAddBookmarkMutation();
    const [removeBookmark, { isLoading: removeBookmarkLoading }] = useRemoveBookmarkMutation();


    const { data: userBookmarks } = useGetUserBookmarksQuery(undefined, { skip: isLoggedIn === false })

    const checkUserBookmarked = () => {
        if (isLoggedIn === false || !userBookmarks) return false;

        return userBookmarks.includes(story_id);
    }

    const isBookmarked = useMemo(checkUserBookmarked, [userBookmarks, isLoggedIn]);



    const handleBookmarkChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        if (isLoggedIn === false) {
            showLoginForm();
            return
        }

        const onError = (err: any) => {
            switch (true) {
                case (err instanceof CanceledError):
                    return

                case (err instanceof ApiError):
                    // toast err.message
                    return

                case (err instanceof UnauthorizedError):
                    // please login again toast
                    showLoginForm()
                    return

                default:
                    // setError(err)
                    // toast err
                    return
            }
        }


        switch (isBookmarked) {
            case (true):
                removeBookmark({ story_id }).unwrap()
                    .then()
                    .catch(onError)
                break;



            case (false):
                addBookmark({ story_id }).unwrap()
                    .then()
                    .catch(onError)
                break;
        }
    }





    const bookmarkColor = isBookmarked ? "#085CFF" : "#fff";

    return (
        <button disabled={addBookmarkLoading || removeBookmarkLoading}
            onClick={handleBookmarkChange}>
            <BookmarkIcon fill={bookmarkColor} className={styles.button_icon} />
        </button>
    );
}

export default BookmarkButton;