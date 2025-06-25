"use client";
import styles from "@/app/page.module.scss";
import React from "react";


export default function OrganizationLicenseContent() {
    return (
        <>
            <div>
                <div
                    className={`${styles.BlogPageContent} mb-[40px] text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
                >
                    <div className="oferta-content policy-content">
                        <section id="communication-loss-costs">
                            <h2>Потеря управления коммуникациями = потеря денег</h2>
                            {/* Контент */}
                        </section>

                        <section id="who-controls-negotiations">
                            <h2>Кто управляет вашими переговорами?</h2>
                            {/* Контент */}
                        </section>

                        <section id="audiosector-control">
                            <h2>Контроль начинается с AUDIOSECTOR</h2>
                            {/* Контент */}
                        </section>

                        <section id="first-month-benefits">
                            <h2>Что Вы получаете уже в первый месяц</h2>
                            {/* Контент */}
                        </section>
                    </div>
                </div>
            </div>

        </>
    );
}
