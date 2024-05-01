import { useContext, useEffect, useState } from "react";
import { loaderContext } from "@src/context/loader";



/**
 * pass array of boolean state variable representing loading status 
 */
const useLoader = (arrayOfLoaders: boolean[]) => {

    const [loader, setLoader] = useState(false);
    const { addLoader, removeLoader } = useContext(loaderContext);


    useEffect(() => {
        if (arrayOfLoaders.some(l => l === true)) setLoader(true);
        else setLoader(false);
    }, [...arrayOfLoaders])


    useEffect(() => {
        if (loader) addLoader();
        else removeLoader();
    }, [loader])
}

export default useLoader;