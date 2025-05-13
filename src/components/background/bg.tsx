'use client';
import styles from "../../app/page.module.scss";
import React from "react";

export default function Bg() {
    return (
        <div
            className={`${styles.faqBg} fixed w-full h-dvh bg-[url(/bg.webp)] bg-no-repeat left-0 top-0 z-[-1]`}
            style={{backgroundAttachment: 'fixed',}}
        >
            <div className={`${styles.linear}  absolute inset-0 bg-black/20`}></div>
        </div>
    );
}
