import React from "react";
import Image from "next/image";
// import {useInView} from "react-intersection-observer";
import AppInput from "@/components/forms/elements/AppInput";
import { useForm, FormProvider } from "react-hook-form";
import styles from "../../app/page.module.scss";
import headerStyles from "../../components/header/Header.module.css";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";

const FooterSubscriptionForm: React.FC = () => {
  const methods = useForm();
  // const {ref, inView} = useInView({threshold: 1});

  return (
    <div className={`${styles.form} flex w-[415px] items-center gap-[22px]`}>
      {/*<Image src="/micro.png" alt='micro' width={95} height={139} priority className={`min-w-[95px] absolute top-[-11px] left-[25px] bottom-[5px] transition-all duration-400 ease-out*/}
      {/*${*/}
      {/*    inView ? 'opacity-100 translate-y-0' : 'translate-y-[140px]'*/}
      {/*}*/}
      {/*`}/>*/}
      <div className="max-w-[228px] flex flex-col items-start justify-between h-[89px]">
        <p className="text-[20px] text-[#3D9ED6] mb-[32px] leading-[110%]">
          Подписаться на новости
        </p>
        <FormProvider {...methods}>
          <form
            action="#"
            className="flex items-center gap-[10px] max-h-[40px]"
          >
            <AppInput
              className={`${styles.footerInpt} !w-[227px] z-[2] mb-[34px] max-h-[40px] !bg-[#101010] focus:!bg-[#20272A] !py-[8px] !pr-[10px] !pl-[13px]`}
              title="Email"
              inputName="email"
              required
            />
            <div className="relative">
              <button
                type="submit"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave} 
                className={`${headerStyles["login-button"]} absolute w-[60px] !h-[40px] bg-[#101010] z-[1] mb-[11px] border !border-[#353535] rounded-[4px] py-[8px] px-[18px] cursor-pointer group flex items-center justify-start`}
              >
                <Image
                  src="/send-icon.svg"
                  alt="send-icon"
                  width={24}
                  height={24}
                />
              </button>
              <div className={styles.highlight} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default FooterSubscriptionForm;
