import { MutableRefObject, useEffect } from "react";


interface Iprops {
    handleClose: () => void;
    ref: MutableRefObject<HTMLElement | null>
}


/**
 * executes callback function when user click's outside of the provided ref.
 * usually used to hide an element.
 */
const useClose = ({ handleClose, ref }: Iprops) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.composedPath().includes(ref.current as Element) === false) handleClose();
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [])
}

export default useClose;