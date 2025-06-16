// import {notFound} from "next/navigation";
// import {faqData} from "@/data/faq";
// import React from "react";
// import Footer from "../../footer";
// import FaqPageContent from "@/components/FaqPageCard/FaqPageContent";
// import Bg from "@/components/background/bg";
//
// type Props = {
//     // params: { id: string };
//     params: Promise<{ id: string }>;
// };
//
// export async function generateStaticParams() {
//     return faqData.map((item) => ({
//         id: item.id.toString(),
//     }));
// }
//
// export default async function FaqPage({params}: Props) {
//     const {id: idString} = await params;
//     const id = parseInt(idString);
//     const faqItem = faqData.find((item) => item.id === id);
//
//     if (!faqItem) return notFound();
//
//     return (
//         <>
//             <div className={`h-dvh`}>
//                 <Bg/>
//                 <div
//                     className="w-full max-w-[1180px] h-auto min-h-lvh mx-auto mt-[120px] px-[10px] mb-[100px] grid grid-cols-4 gap-[58px]">
//                     <FaqPageContent id={id}/>
//                 </div>
//                 <Footer/>
//             </div>
//         </>
//     );
// }

import {notFound} from "next/navigation";
import {faqData} from "@/data/faq";
import React from "react";
import Footer from "../../footer";
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

export default async function FaqPage({ params, searchParams }: Props) {
    // Ожидаем разрешения Promise для получения параметров
    const { id: idParam } = await params;
    const searchParamsResolved = searchParams ? await searchParams : {};
    
    const id = parseInt(idParam);
    const fromHeader = searchParamsResolved?.from === "header";
    const faqItem = faqData.find((item) => item.id === id);

    if (!faqItem) return notFound();

    return (
        <>
            <div className={`h-dvh`}>
                <Bg/>
                <div
                    className="w-full max-w-[1180px] h-auto min-h-lvh mx-auto mt-[120px] px-[10px] mb-[100px] grid grid-cols-4 gap-[40px]">
                    <Breadcrumbs faqPage={true}/>
                    <FaqPageContent
                        fromHeader={fromHeader}
                        id={id}
                    />
                </div>
                <Footer/>
            </div>
        </>
    );
}

