import './close.css';

export const Close = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            {/* <div onClick={onClick}
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
            </div> */}

            <svg 
            onClick={onClick} 
            className="animated-close absolute md:top-[22px]  !top-[35px]  !right-[108px] z-10"
            width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_5371_3270)">
                    <mask id="mask0_5371_3270" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="-1" y="-1" width="16" height="16">
                        <path d="M15 -1H-1V15H15V-1Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_5371_3270)">
                        <path d="M0.636568 2.05093L11.9503 13.3646L13.3645 11.9504L2.05078 0.636719L0.636568 2.05093Z" fill="#ADADAD" />
                        <path d="M2.05093 13.3647L8.41489 7.00069L7.00068 5.58648L0.636719 11.9504L2.05093 13.3647ZM10.5362 4.87937L13.3646 2.05094L11.9504 0.636731L9.122 3.46516L10.5362 4.87937Z" fill="#ADADAD" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_5371_3270">
                        <rect width="14" height="14" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </>
    )
}




export default Close;