import React, {useEffect} from "react";
import FlyingPlane from "./FlyingPlane";

const FlightSuccess = ({close, small = false, text, subText, isContactPage = false, isRegisterPage = false}: {
    close: () => void;
    small?: boolean;
    text: string,
    subText: string,
    isContactPage: boolean,
    isRegisterPage: boolean
}) => {

    const [time, setTime] = React.useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                const num = prev - 1;
                if (num === 0) {
                    clearInterval(timer);
                    close(); // или: if (closeIcon) close();
                }
                return num;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    return (
        <div className="active">

            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-[30px] text-white text-center items-center">
                    <div className="h-[23px]">
                        <h3 className={`text-[32px] text-[#CCCCCC] leading-[37px] `}>
                            {text}
                        </h3>
                    </div>

                    <p
                        className={` !text-[20px] text-[#CCCCCC] leading-[120%] flex flex-col items-center justify-center gap-5 
                        ${ isRegisterPage ? 'max-w-[568px] gap-2' : 'w-full' }
                        ${isContactPage ? "" : "mb-[40px]"}`}
                    >
                        {subText}
                        {isRegisterPage ? (
                            <span> Письмо с активацией на указанный email мы уже отправили!</span>
                        ) : (
                            <>
                            </>
                        )}
                    </p>


                </div>
                <div
                    className={`${
                        small ? "top-[110px]" : "top-[210px]"
                    } left-0 right-0`}
                >
                    <FlyingPlane/>
                </div>
                <p
                    className={`text-[#A4A4A4] font-light !text-[44px]  ${
                        isContactPage ? "mt-[10px]" : "mt-[40px]"
                    } `}
                >
                    {time}
                </p>
            </div>
        </div>
    );
};

export default FlightSuccess;
