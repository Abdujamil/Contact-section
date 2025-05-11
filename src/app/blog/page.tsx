import React from 'react';
import Header from "@/components/header/Header";
import styles from "@/app/page.module.scss";
import ContactsCard from '@/components/ContactsCard/ContactsCard'

const BlogPage = () => {
    return (
        <div className={`h-screen flex flex-col items-center justify-center`}>
            {/* Background */}
            <div
                className={`${styles.faqBg} fixed w-full h-dvh bg-[url(/bg.png)] bg-no-repeat left-0 top-0 z-[-1]`}
                style={{backgroundAttachment: 'fixed',}}
            >
                <div className={`${styles.linear}  absolute inset-0 bg-black/20`}></div>
            </div>
            <div
                className={`${styles.blog} w-full min-h-full h-auto mx-auto flex flex-col items-center`}>
                <Header/>
                <div
                    className={`${styles.blog} w-full max-w-[1180px] my-[10px] min-h-full h-auto mt-[60px] mb-[127px] mx-auto flex flex-col items-center`}>
                    <h2 className={`${styles.txtGradientRight} text-center text-[56px] leading-[110%] mb-10`}>Полезные
                        статьи и советы по <br/> преобразованию аудио в текст</h2>

                    <div className={`${styles.blogCardsContainer} h-auto w-full`}>
                        <div className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[127px]`}>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                            <ContactsCard/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;