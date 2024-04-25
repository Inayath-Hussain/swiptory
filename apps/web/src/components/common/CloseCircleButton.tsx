import CloseCircle from "@src/assets/icons/close_circle.svg";


interface Iprops {
    imageClassName?: string
    buttonClassName?: string
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CloseCircleButton: React.FC<Iprops> = ({ buttonClassName, imageClassName, handleClick }) => {
    return (
        <button className={buttonClassName} onClick={handleClick} type="button">
            <img src={CloseCircle} alt="" className={imageClassName} />
        </button>
    );
}

export default CloseCircleButton;