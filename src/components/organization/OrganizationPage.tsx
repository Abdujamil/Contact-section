"use client";
import React, {useState, Suspense} from "react";
import styles from "@/app/page.module.scss";
import Bg from "@/components/background/bg";
import OrganizationSidebar from "@/components/organization/OrganizationSidebar";
import OrganizationContent from "@/components/organization/OrganizationContent";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import TryBlock from "@/components/TryBlock/page";

export type OrganizationTab = "aboutCompany" | "whereDoYouLose" | "TurnAPI" | "WhatIsApi";
const tabTitles: Record<OrganizationTab, string> = {
    aboutCompany: "О компании",
    whereDoYouLose: "Где вы теряете",
    TurnAPI: "Документация REST API Audiosector",
    WhatIsApi: "Транскрибация с помощью API",
};

// Компонент с логикой useSearchParams
function OrganizationPageContent() {
    const [activeTab, setActiveTab] = useState<OrganizationTab>("aboutCompany");
    const handleTabChange = (tab: OrganizationTab) => {
        setActiveTab(tab);

        window.dispatchEvent(new Event('customScrollToTop'));
    };

    return (
        <>
            <Bg/>
            <div
                className={`${styles.politic} w-full max-w-[1180px] px-[10px] m-auto h-auto min-h-dvh mt-[110px]`}
            >
                <Breadcrumbs organizationUrl={true} />
                <h1
                    className={`${styles.txtGradientTitle} w-fit m-auto text-center text-[28px] leading-[110%] mb-[20px]
                            md:text-[48px] md:mb-[40px]`}
                >
                    {tabTitles[activeTab]}
                </h1>
                <div className="w-full md:grid gap-[40px] grid-cols-[260px_1fr]">
                    <OrganizationSidebar activeTab={activeTab} setActiveTab={handleTabChange}/>
                    <OrganizationContent activeTab={activeTab}/>
                </div>

                <div className={`w-full md:grid gap-[40px] grid-cols-[260px_1fr]`}>
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
export default function OrganizationPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <OrganizationPageContent/>
        </Suspense>
    );
}