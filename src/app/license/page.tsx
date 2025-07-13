"use client"
import React, {useRef, useState} from "react";
import Bg from "@/components/background/bg";
import styles from "@/app/page.module.scss";
import PolicySidebar from "@/components/policy/PolicySidebar";
import PolicyContent from "@/components/policy/PolicyContent";

export type PolicyTab = "policy" | "offer" | "license";

const tabTitles: Record<PolicyTab, string> = {
    policy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    license: "Лицензии",
};


function LicensePage() {
    const [activeTab, setActiveTab] = useState<PolicyTab>("policy");
    const contentRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (tab: PolicyTab) => {
        setActiveTab(tab);

        // Задержка для того, чтобы DOM обновился перед скроллом
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('scrollbar'));
        }, 100);
    };

    return (
        <>
            <Bg/>
            <div
                className={`${styles.politic} w-full max-w-[1180px] px-[10px] m-auto h-auto min-h-dvh mt-[130px]`}
            >
                <h1
                    className={`${styles.txtGradientTitle} text-center text-[48px] leading-[110%] mt-[-8px] mb-[40px]`}
                >
                    {tabTitles[activeTab]}
                </h1>

                <div ref={contentRef} className="w-full grid gap-[40px] grid-cols-[260px_1fr]">
                    <PolicySidebar activeTab={activeTab} setActiveTab={handleTabChange}/>
                    <PolicyContent activeTab={activeTab}/>
                </div>
            </div>
        </>
    )
}

export default LicensePage;