import React, { useEffect } from "react";
import Image from "next/image";
import AppInput from "@/components/forms/elements/AppInput";
import { useForm, FormProvider } from "react-hook-form";
import styles from "../../app/page.module.scss";
import headerStyles from "../../components/header/Header.module.css";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import {emailRegex} from "@/components/Form/validation";

const FooterSubscriptionForm: React.FC = () => {
    const methods = useForm();

    const { register, handleSubmit } = methods;

    useEffect(() => {
        // Регистрируем email с кастомной валидацией
        register("email", {
            required: "Введите email",
            pattern: {
                value: emailRegex,
                message: "Неверный формат email",
            },
        });
    }, [register]);

    const onSubmit = () => {
        console.log("✅ Email отправлен:");
        methods.reset();
    };

    return (
        <div className={`${styles.form} md:flex md:w-[415px] md:items-center items-start gap-[22px]`}>
            <div className="max-w-[228px] flex flex-col items-start justify-between h-[89px]">
                <p className="text-nowrap text-[20px] text-[#3D9ED6] mb-[32px] leading-[110%]">
                    Подписаться на новости
                </p>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center gap-[10px] max-h-[40px]"
                    >
                        <AppInput
                            className={`${styles.footerInpt} !w-[232px] z-[2] mb-[34px] max-h-[40px] !bg-[#101010] focus:!bg-[#20272A] !py-[8px] !pr-[10px] !pl-[13px]`}
                            title="Email"
                            inputName="email"
                            required
                        />
                        <div className="relative">
                            <button
                                type="submit"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className={`${headerStyles["login-button"]} absolute w-[60px] !h-[39px] bg-[#101010] z-[1] mb-[11px] border !border-[#353535] rounded-[4px] py-[8px] px-[18px] cursor-pointer group flex items-center justify-start active:scale-[.95]`}
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
