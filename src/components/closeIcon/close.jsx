import './close.css';

export const Close = ({onClick}) => {
    return (
        <div onClick={onClick}
             className="close absolute md:top-[22px]  !top-[20px]  !right-[95px] z-10 w-10 h-10"
             id="close-modal">
            <div className="in">
                <div className="close-button-block"></div>
                <div className="close-button-block"></div>
            </div>
            <div className="out">
                <div className="close-button-block"></div>
                <div className="close-button-block"></div>
            </div>
        </div>
    )
}


export default Close;