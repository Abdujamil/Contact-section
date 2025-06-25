'use client';
import styles from "../page.module.scss";
import React from "react";
import Bg from "@/components/background/bg";

export default function Organizations() {

    return (
        <>
            <div className={`${styles.page}`}>
               <Bg />
                <div className={`${styles.contact} w-full mx-auto flex flex-col items-center`}>
                    <div id="type-container"
                         className="my-[50px] w-full max-w-[900px] mt-[190px] flex flex-col items-center justify-center gap-[10px] z-[900] relative">
                        <h1 className="relative mt-[-5px] not-italic font-normal text-[48px] leading-[110%] tracking-[-0.03em] text-center txt-gradient-right">Организациям!</h1>
                        <p className="font-normal text-[28px] text-[#3d9ed6] leading-[120%] tracking-[-0.03em] text-center z-[900] flex items-center whitespace-nowrap self-center">
                            Решения для бизнеса
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
