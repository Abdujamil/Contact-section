import {notFound} from "next/navigation";
import {faqData} from "@/data/faq";
import React from "react";
import FaqPageContent from "@/components/FaqPageCard/FaqPageContent";
import Bg from "@/components/background/bg";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";

// Обновленный тип для Next.js 15
type Props = {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
    return faqData.map((item) => ({
        id: item.id.toString(),
    }));
}

export default async function FaqPage({params, searchParams}: Props) {
    // Ожидаем разрешения Promise для получения параметров
    const {id: idParam} = await params;
    const searchParamsResolved = searchParams ? await searchParams : {};

    const id = parseInt(idParam);
    const fromHeader = searchParamsResolved?.from === "header";
    const faqItem = faqData.find((item) => item.id === id);

    if (!faqItem) return notFound();

    return (
        <>
            <div className={``}>
                <Bg/>
                <Breadcrumbs faqPage={true}/>
                <div
                    className="w-full max-w-[1180px] h-auto mx-auto mt-[120px]">
                    <FaqPageContent
                        fromHeader={fromHeader}
                        id={id}
                    />
                </div>
            </div>
        </>
    );
}

