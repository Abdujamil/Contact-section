"use client";
import React, {useState, Suspense} from "react";
import styles from "@/app/page.module.scss";
import Bg from "@/components/background/bg";
import PolicySidebar from "@/components/policy/PolicySidebar";
import PolicyContent from "@/components/policy/PolicyContent";
// import {useSearchParams} from "next/navigation";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import TryBlock from "@/components/TryBlock/page";
// import {OrganizationTab} from "@/components/organization/OrganizationPage";
// import {OrganizationTab} from "@/components/organization/OrganizationPage";

export type PolicyTab = "policy" | "offer" | "license";

const tabTitles: Record<PolicyTab, string> = {
    policy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    license: "Лицензии",
};

// Компонент с логикой useSearchParams
function PolicyPageContent() {
    const [activeTab, setActiveTab] = useState<PolicyTab>("policy");
    const handleTabChange = (tab: PolicyTab) => {
        setActiveTab(tab);

        // 👇 Вызов кастомного события для скролла вверх
        window.dispatchEvent(new Event('customScrollToTop'));
    };

    return (
        <>
            <Bg/>
            <div
                className={`${styles.politic} w-full max-w-[1180px] px-[10px] m-auto h-auto min-h-dvh mt-[120px]`}
            >
                <Breadcrumbs policyUrl={true}/>
                <h1
                    className={`${styles.txtGradientTitle} w-fit m-auto text-center text-[48px] leading-[110%] mt-[-8px] mb-[40px]`}
                >
                    {tabTitles[activeTab]}
                </h1>

                <div className="w-full grid gap-[40px] grid-cols-[260px_1fr]">
                    <PolicySidebar activeTab={activeTab} setActiveTab={handleTabChange}/>
                    <PolicyContent activeTab={activeTab}/>
                </div>

                <div className={`w-full grid gap-[40px] grid-cols-[260px_1fr]`}>
                    <div className={`w-[480px]`}>

                    </div>

                    <TryBlock
                        title="Хотите протестировать?"
                        content="
                Попробуйте AUDIOSECTOR прямо сейчас. Никаких сложностей. Только
                результат."
                    />
                </div>
            </div>
        </>
    );
}

// Основной компонент страницы с Suspense
export default function PolicyPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <PolicyPageContent/>
        </Suspense>
    );
}