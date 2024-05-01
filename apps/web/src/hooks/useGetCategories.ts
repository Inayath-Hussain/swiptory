import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesService } from "@src/services/category/getCategories";
import { ApiError, CanceledError } from "@src/services/errors";
import { addApiError, addCategoryOptions, categoriesSelector } from "@src/store/slices/categories";
import useLoader from "./useLoader";


/**
 * hook to get list of categories and store it in redux
 */
const useGetCategories = () => {

    const { isError, isOptionsFetched } = useSelector(categoriesSelector);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useLoader([loading]);

    useEffect(() => {
        const call = async () => {
            setLoading(true)
            getCategoriesService().then((data) => {
                setLoading(false);

                switch (true) {
                    case (data instanceof CanceledError):
                        return

                    case (data instanceof ApiError):
                        dispatch(addApiError())
                        return

                    default:
                        dispatch(addCategoryOptions(data))
                        return
                }
            })
        }

        if (isOptionsFetched === false || isError === true) call()

    }, [])
}

export default useGetCategories;