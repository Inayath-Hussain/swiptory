import { useState } from "react";
import { createPortal } from "react-dom";
import ModalBase from "@src/components/Modal/ModalBase";


/**
 * hook to handle display status of modal which is passed as argument in ModalPortal function.
 */
const useModal = () => {

    const [showModalState, setShowModalState] = useState(false);


    const showModal = () => {
        setShowModalState(true)
    }

    const hideModal = () => {
        setShowModalState(false)
    }


    /**
     * this function should be called inside render lifecycle of component.
     */
    const ModalPortal = (ModalComponent: JSX.Element, closeWhenClickedOutside: boolean = true): React.ReactPortal | null => {

        const modalDiv = document.getElementById("modal");

        if (modalDiv === null) throw Error("element with id 'modal' not found")

        const close = closeWhenClickedOutside ? hideModal : () => { }
        if (showModalState) return createPortal(<ModalBase close={close}> {ModalComponent} </ModalBase>, modalDiv)

        return null
    }

    return {
        showModalState,
        showModal,
        hideModal,
        ModalPortal
    }
}

export default useModal;