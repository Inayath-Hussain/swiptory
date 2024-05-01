import LoaderModal from "@src/components/Modal/Loader";
import { PropsWithChildren, createContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface Ivalue {
    value: number
    addLoader: () => void
    removeLoader: () => void
}

export const loaderContext = createContext({ value: 0, addLoader: () => { }, removeLoader: () => { } } as Ivalue)




export const LoaderContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [loaderState, setLoaderState] = useState<Ivalue["value"]>(0);

    const addLoader = () => {
        setLoaderState(prev => prev + 1);
    }

    const removeLoader = () => {
        setLoaderState(prev => prev === 0 ? prev : prev - 1);
    }


    const modalDiv = useMemo(() => document.getElementById("loader"), []);

    if (modalDiv === null) throw Error("element with id 'loader' not found")


    return (
        <loaderContext.Provider value={{ value: loaderState, addLoader, removeLoader }}>
            {children}

            {loaderState > 0 ? createPortal(<LoaderModal />, modalDiv) : null}
        </loaderContext.Provider>
    );
}