import React, { useEffect } from "react";
import FlyingPlane from "./FlyingPlane";

const FlightSuccess = ({ close, small = false, text }: { close: () => void; small?: boolean; text: string }) => {

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
    <div className="active]">
    
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-[30px] text-white text-center items-center">
          <div className="h-[23px]">
            {/* <p className="text-[32px] tracking-[-0.03em]">{text}</p> */}
            <h3 className={`text-[32px] text-[#CCCCCC] leading-[37px] `}>
              {text}
            </h3>
          </div>

          {/*  <p className="text-[20px]">Мы свяжемся с Вами <br /> в течение 10 минут!</p> */}

          <p
            className={`text-[20px] text-[#CCCCCC] leading-[120%] flex flex-col items-center justify-center gap-5 mb-[40px]`}
          >
            Форма будет доступна через
            <span
              className={`text-[44px] text-[#A4A4A4] leading-[120%] font-[Rubik]`}
            ></span>
          </p>
          <p
            className={`text-[#A4A4A4] font-light text-[44px] rubik absolute top-[130px] left-[50%] translate-x-[-50%]`}
          >
            {time}
          </p>
        </div>
        <div
          className={`${
            small ? "top-[180px]" : "top-[210px]"
          } left-0 right-0 absolute`}
        >
          <FlyingPlane />
        </div>
      </div>
    </div>
  );
};

export default FlightSuccess;
