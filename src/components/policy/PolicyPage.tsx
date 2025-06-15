"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.scss";
import Bg from "@/components/background/bg";
import PolicySidebar from "@/components/policy/PolicySidebar";
import PolicyContent from "@/components/policy/PolicyContent";
import Footer from "@/app/footer";
export type PolicyTab = "policy" | "offer" | "license";
import { useSearchParams } from "next/navigation";

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

export default function PolicyPage() {
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
      <Bg />
      <div
        className={`${styles.politic} w-full max-w-[1180px] px-[10px] m-auto h-auto min-h-dvh mt-[120px]`}
      >
        {/* <Bg /> */}
        <h1
          className={`${styles.txtGradientRight} text-center text-[48px] leading-[110%] mt-[-8px] mb-[30px]`}
        >
           {tabTitles[activeTab]}
        </h1>

        <div className="w-full grid gap-[40px] grid-cols-[260px_1fr]">
          <PolicySidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <PolicyContent activeTab={activeTab} />
        </div>
      </div>
     <Footer />
    </>
  );
}
