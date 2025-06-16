"use client";
import React, {useState, useEffect, Suspense} from "react";
import styles from "@/app/page.module.scss";
import Bg from "@/components/background/bg";
import PolicySidebar from "@/components/policy/PolicySidebar";
import PolicyContent from "@/components/policy/PolicyContent";
import Footer from "@/app/footer";
import {useSearchParams} from "next/navigation";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";

export type PolicyTab = "policy" | "offer" | "license";

const tabTitles: Record<PolicyTab, string> = {
    policy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    license: "Лицензии",
};

const urlToTabMap: Record<string, PolicyTab> = {
    "oferta": "offer",
    "license": "license",
    "politic": "policy",
};

// Компонент с логикой useSearchParams
function PolicyPageContent() {
    const [activeTab, setActiveTab] = useState<PolicyTab>("policy");
    const searchParams = useSearchParams();

    useEffect(() => {
        // Получаем параметр tab из URL
        const tabParam = searchParams.get("tab");

        if (tabParam && urlToTabMap[tabParam]) {
            setActiveTab(urlToTabMap[tabParam]);
        }
    }, [searchParams]);

    return (
        <>
            <Bg/>
            <div
                className={`${styles.politic} w-full max-w-[1180px] px-[10px] m-auto h-auto min-h-dvh mt-[120px]`}
            >
                <Breadcrumbs policyUrl={true}/>
                <h1
                    className={`${styles.txtGradientTitle} text-center text-[48px] leading-[110%] mt-[-8px] mb-[30px]`}
                >
                    {tabTitles[activeTab]}
                </h1>

                <div className="w-full grid gap-[40px] grid-cols-[260px_1fr]">
                    <PolicySidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <PolicyContent activeTab={activeTab}/>
                </div>
            </div>
            <Footer/>
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