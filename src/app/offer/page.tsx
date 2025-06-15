"use client"
import React, {useState} from "react";
import PolicyOfferContent from "@/components/policy/PolicyOfferContent";
import Bg from "@/components/background/bg";
import styles from "@/app/page.module.scss";
import Footer from "@/app/footer";
import PolicySidebar from "@/components/policy/PolicySidebar";

export type PolicyTab = "policy" | "offer" | "license";

const tabTitles: Record<PolicyTab, string> = {
    policy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    license: "Лицензии",
};

function OfferPage() {
    const [activeTab, setActiveTab] = useState<PolicyTab>("policy");


    return (
        <>
            <Bg/>
            <div
                className={`${styles.politic} w-full max-w-[1180px] px-[10px] m-auto h-auto min-h-dvh mt-[120px]`}
            >
                <h1
                    className={`${styles.txtGradientTitle} text-center text-[48px] leading-[110%] mt-[-8px] mb-[30px]`}
                >
                    {tabTitles[activeTab]}
                </h1>

                <div className="w-full grid gap-[40px] grid-cols-[260px_1fr]">
                    <PolicySidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <PolicyOfferContent/>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default OfferPage;