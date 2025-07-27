"use client";
import styles from "@/app/page.module.scss";
import React from "react";
import Image from "next/image";
import CountUp from "@/components/CountUp/countUp";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";

const stats = [
    {
        percent: (
            <CountUp
                from={0}
                to={30}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
            />
        ),
        text: "сделок срываются, потому что менеджер «забыл перезвонить»",
    },
    {
        percent: (
            <CountUp
                from={0}
                to={56}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
            />
        ),
        text: "клиентов не возвращаются, потому что им не ответили вовремя",
    },
    {
        percent: (
            <CountUp
                from={0}
                to={80}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
            />
        ),
        text: "потерь происходят не из-за цен, а из-за слабых переговоров",
    },
    {
        percent: (
            <CountUp
                from={0}
                to={95}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
            />
        ),
        text: "совещаний не дают результата, потому что выводы не фиксируются",
    },
    {
        percent: "HR",
        text: "не видит, как работают сотрудники — ошибки повторяются.",
    },
    {
        percent: "Вы",
        text: "не знаете, кто приносит прибыль, а кто теряет клиентов.",
    },
];
const benefits = [
    "Менеджеры работают эффективнее — ни одной потерянной сделки. Система подсказывает, где менеджер упустил клиента, помогает корректировать действия и делает работу более осознанной и результативной.",
    "Вы видите, кто реально приносит прибыль, а кто срывает переговоры. Аналитика по каждому сотруднику показывает, на каком этапе происходит провал, и позволяет усиливать команду точечно.",
    "Отдел продаж закрывает больше контрактов — конверсия растёт.Вы устраняете слабые места в диалогах и усиливаете скрипты на основе реальных данных, а не догадок или «чувства».",
    "Руководство принимает решения на основе данных, а не догадок. Вы получаете объективную картину всех процессов: кто, что, когда сказал, какие выводы сделал и к каким результатам это привело.",
    "Вы не теряете деньги — каждый разговор работает на вас. Каждое взаимодействие с клиентом превращается в актив: его можно проанализировать, улучшить, использовать в обучении и масштабировании.",
    "Процессы становятся предсказуемыми — хаос уходит из операционной работы. Вы больше не зависите от случайностей и человеческого фактора — каждое действие можно отследить, повторить и масштабировать.",
];

export default function OrganizationWhereDoYouLoseContent() {
    return (
        <>
            <Breadcrumbs organizationWhereDoYouLose={true}/>
            <div>
                <div
                    className={`${styles.BlogPageContent} mb-[115px] text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
                >
                    <div className="oferta-content policy-content">
                        <section id="communication-loss-costs">
                            <h2 className={`!text-[32px] !mb-[30px]`}>Потеря управления коммуникациями = потеря
                                денег</h2>

                            <div className={`mb-[30px]`}>
                                <p>
                                    Вы управляете бизнесом, где ежедневно проходят сотни, тысячи, а может, десятки тысяч
                                    звонков, встреч и переговоров.
                                </p>
                                <p>
                                    Клиенты делают запросы, менеджеры обещают скидки, руководители ставят задачи,
                                    принимаются ключевые решения…
                                </p>
                                <p>
                                    Но сколько из этой информации остаётся у вас под контролем? Большинство бизнесов
                                    теряют
                                    деньги не потому, что у них плохой продукт или слабая команда.
                                </p>
                                <p>
                                    Они теряют прибыль из-за неконтролируемых переговоров и отсутствия системной
                                    фиксации
                                    информации.
                                </p>
                            </div>

                            <div className={`mb-[50px]`}>
                                <h3 className={`!text-[24px] !mb-[30px]`}>Цифры, которые говорят сами за себя</h3>

                                <div className="flex flex-wrap gap-4">
                                    {stats.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="w-full max-w-[390px] h-full md:max-h-[133px] p-[20px] rounded-[6px] backdrop-blur-[2px] border border-[#353535] bg-[rgba(0,0,0,0.07)] shadow-[0px_0px_10px_rgba(0,0,0,0.6),_inset_0px_0px_6px_rgba(255,255,255,0.1)]"
                                        >
                                            <h5 className={`w-fit font-[Rubik] text-[48px] mb-[15px] leading-[75%] ${styles.txtGradientTitle}`}>
                                                {item.percent}%
                                            </h5>
                                            <p className="!mb-0">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section id="who-controls-negotiations">
                            <h2 className={`!text-[32px] !mb-[30px]`}>Кто управляет вашими переговорами?</h2>
                            <div className={`mb-[50px]`}>
                                <div className={`flex flex-wrap md:flex-nowrap gap-[20px]`}>
                                    <div
                                        className={`w-full max-w-[390px] h-[133px] p-[20px] rounded-[6px] overflow-hidden backdrop-blur-[2px] border border-[#353535] bg-[rgba(0,0,0,0.07)] shadow-[0px_0px_10px_rgba(0,0,0,0.6),_inset_0px_0px_6px_rgba(255,255,255,0.1)] relative`}>
                                        <p className={`font-[Rubik] md:!text-[20px] leading-[120%] max-w-[180px] md:max-w-full`}>Вы уверены, что контролируете
                                            каждый звонок?</p>

                                        <svg className={`absolute right-0 top-5 md:w-[121px] md:h-full sm:w-[96px] sm:h-[90px]`} width="121" height="118" viewBox="0 0 121 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_di_4337_3700)">
                                                <rect x="35.8252" y="19" width="60" height="60" rx="30" fill="black" fillOpacity="0.05" shapeRendering="crispEdges"/>
                                                <rect x="35.9252" y="19.1" width="59.8" height="59.8" rx="29.9" stroke="white" strokeWidth="0.2" shapeRendering="crispEdges"/>
                                            </g>
                                            <g filter="url(#filter1_d_4337_3700)">
                                                <path d="M56.6487 36.998H60.6709C61.6523 36.998 62.5348 37.5955 62.8992 38.5067L64.3849 42.2208C64.8082 43.279 64.4009 44.4879 63.4236 45.0743C62.3874 45.696 61.9864 47.0212 62.6647 48.0214C63.769 49.65 65.1732 51.0542 66.8018 52.1586C67.802 52.8368 69.1272 52.4358 69.749 51.3996C70.3353 50.4223 71.5443 50.0151 72.6024 50.4383L76.3165 51.924C77.2277 52.2885 77.8252 53.171 77.8252 54.1523V58.1745C77.8252 58.9234 77.5277 59.6415 76.9982 60.1711C76.4687 60.7006 75.7505 60.998 75.0017 60.998C69.4947 60.6634 64.3007 58.3249 60.3995 54.4237C56.4984 50.5225 54.1599 45.3285 53.8252 39.8216C53.8252 39.0727 54.1227 38.3546 54.6522 37.825C55.1817 37.2955 55.8999 36.998 56.6487 36.998Z" stroke="#ADADAD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"/>
                                            </g>
                                            <g filter="url(#filter2_d_4337_3700)">
                                                <circle cx="15.3588" cy="42.3013" r="1.09709" transform="rotate(-90 15.3588 42.3013)" fill="#555555"/>
                                            </g>
                                            <g filter="url(#filter3_d_4337_3700)">
                                                <circle cx="105.321" cy="88.3785" r="1.09709" transform="rotate(-90 105.321 88.3785)" fill="#555555"/>
                                            </g>
                                            <g filter="url(#filter4_d_4337_3700)">
                                                <circle cx="100.932" cy="6.09725" r="1.09709" transform="rotate(-90 100.932 6.09725)" fill="#818181"/>
                                            </g>
                                            <g filter="url(#filter5_d_4337_3700)">
                                                <circle cx="20.2966" cy="48.3352" r="0.548544" transform="rotate(-90 20.2966 48.3352)" fill="#555555"/>
                                            </g>
                                            <g filter="url(#filter6_d_4337_3700)">
                                                <circle cx="95.9948" cy="94.4124" r="0.548544" transform="rotate(-90 95.9948 94.4124)" fill="#555555"/>
                                            </g>
                                            <g filter="url(#filter7_d_4337_3700)">
                                                <circle cx="115.743" cy="12.1311" r="0.548544" transform="rotate(-90 115.743 12.1311)" fill="#555555"/>
                                            </g>
                                            <circle cx="66.9227" cy="115.806" r="2.13932" fill="url(#paint0_linear_4337_3700)" fillOpacity="0.1" stroke="url(#paint1_linear_4337_3700)" strokeWidth="0.109709"/>
                                            <circle cx="76.7957" cy="115.806" r="2.13932" fill="url(#paint2_linear_4337_3700)" fillOpacity="0.1" stroke="url(#paint3_linear_4337_3700)" strokeWidth="0.109709"/>
                                            <circle cx="86.6698" cy="115.806" r="2.13932" fill="url(#paint4_linear_4337_3700)" fillOpacity="0.1" stroke="url(#paint5_linear_4337_3700)" strokeWidth="0.109709"/>
                                            <rect x="11.0256" y="84.0451" width="8.66699" height="33.9" rx="1.04223" fill="url(#paint6_linear_4337_3700)" fillOpacity="0.1" stroke="url(#paint7_linear_4337_3700)" strokeWidth="0.109709"/>
                                            <rect x="21.9963" y="93.9191" width="8.66699" height="24.0262" rx="1.04223" fill="url(#paint8_linear_4337_3700)" fillOpacity="0.1" stroke="url(#paint9_linear_4337_3700)" strokeWidth="0.109709"/>
                                            <rect x="32.9679" y="103.793" width="8.66699" height="14.1524" rx="1.04223" fill="url(#paint10_linear_4337_3700)" fillOpacity="0.1" stroke="url(#paint11_linear_4337_3700)" strokeWidth="0.109709"/>
                                            <defs>
                                                <filter id="filter0_di_4337_3700" x="31.0252" y="14.2" width="69.6" height="69.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="2.4"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="3.6"/>
                                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"/>
                                                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_4337_3700"/>
                                                </filter>
                                                <filter id="filter1_d_4337_3700" x="46.0256" y="29.1984" width="39.5992" height="39.5992" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="3.6"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                </filter>
                                                <filter id="filter2_d_4337_3700" x="9.87337" y="36.8158" width="10.971" height="10.971" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="2.19417"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                </filter>
                                                <filter id="filter3_d_4337_3700" x="99.8353" y="82.8929" width="10.971" height="10.971" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="2.19417"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                </filter>
                                                <filter id="filter4_d_4337_3700" x="95.4466" y="0.61165" width="10.971" height="10.971" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="2.19417"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                </filter>
                                                <filter id="filter5_d_4337_3700" x="17.9927" y="46.0318" width="4.60736" height="4.60736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.87767"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                </filter>
                                                <filter id="filter6_d_4337_3700" x="93.6909" y="92.1089" width="4.60736" height="4.60736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.87767"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                </filter>
                                                <filter id="filter7_d_4337_3700" x="113.439" y="9.82767" width="4.60736" height="4.60736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.87767"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3700"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3700" result="shape"/>
                                                </filter>
                                                <linearGradient id="paint0_linear_4337_3700" x1="66.9227" y1="113.611" x2="66.9227" y2="118" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_4337_3700" x1="85.0246" y1="115.257" x2="77.4098" y2="125.775" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.5"/>
                                                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_4337_3700" x1="76.7957" y1="113.611" x2="76.7957" y2="118" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_4337_3700" x1="94.8977" y1="115.257" x2="87.2829" y2="125.775" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.5"/>
                                                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_4337_3700" x1="86.6698" y1="113.611" x2="86.6698" y2="118" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_4337_3700" x1="104.772" y1="115.257" x2="97.1569" y2="125.775" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.5"/>
                                                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_4337_3700" x1="15.3591" y1="83.9902" x2="15.3591" y2="118" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint7_linear_4337_3700" x1="22.673" y1="82.9274" x2="5.76213" y2="96.747" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.5"/>
                                                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                                                </linearGradient>
                                                <linearGradient id="paint8_linear_4337_3700" x1="26.3298" y1="93.8643" x2="26.3298" y2="118" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint9_linear_4337_3700" x1="33.6437" y1="93.11" x2="21.5179" y2="107.073" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.5"/>
                                                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                                                </linearGradient>
                                                <linearGradient id="paint10_linear_4337_3700" x1="37.3014" y1="103.738" x2="37.3014" y2="118" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint11_linear_4337_3700" x1="44.6154" y1="103.293" x2="38.7364" y2="114.749" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.5"/>
                                                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                    </div>
                                    <div
                                        className={`w-full max-w-[390px] h-[133px] p-[20px] rounded-[6px] overflow-hidden backdrop-blur-[2px] border border-[#353535] bg-[rgba(0,0,0,0.07)] shadow-[0px_0px_10px_rgba(0,0,0,0.6),_inset_0px_0px_6px_rgba(255,255,255,0.1)] relative`}>
                                        <p className={`font-[Rubik] md:!text-[20px] leading-[120%] max-w-[180px] md:max-w-full`}>Кто несёт ответственность <br/> за
                                            результат разговоров?</p>

                                        <svg className={`absolute right-0 top-5 md:w-[121px] md:h-auto sm:w-[96px] sm:h-[90px]`} width="121" height="113" viewBox="0 0 121 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_di_4337_3717)">
                                                <rect x="106.418" y="9.87402" width="10.9709" height="10.9709" rx="5.48544" fill="black" fillOpacity="0.05" shapeRendering="crispEdges"/>
                                                <rect x="106.468" y="9.92402" width="10.8709" height="10.8709" rx="5.43544" stroke="white" strokeWidth="0.1" shapeRendering="crispEdges"/>
                                            </g>
                                            <path d="M65.8953 6.58398C55.9881 6.58398 43.4778 15.1971 45.4401 29.5018C45.596 30.6383 45.3785 31.7955 44.9168 32.8456C39.997 44.0351 48.5 67.0599 63.9319 67.9884C76.8913 68.7681 85.04 55.3176 87.4944 48.4949C84.1491 45.5306 84.6977 30.1714 90.1831 29.0743C90.1831 10.9723 76.2039 6.58398 65.8953 6.58398Z" fill="url(#paint0_linear_4337_3717)" fillOpacity="0.2"/>
                                            <path d="M95.5659 31.9664C95.8931 28.2263 95.4338 24.4602 94.2163 20.9012C92.9987 17.3423 91.049 14.0662 88.4878 11.2759C85.9266 8.48554 82.8084 6.24036 79.3263 4.67934C75.8442 3.11831 72.0723 2.27467 68.2442 2.20065C64.416 2.12662 60.6132 2.8238 57.071 4.249C53.5288 5.67421 50.3227 7.7971 47.6513 10.4862C44.9798 13.1754 42.8999 16.3735 41.5402 19.8827C40.1805 23.3918 39.57 27.1372 39.7465 30.887L41.8267 30.7929C41.6634 27.3222 42.2284 23.8556 43.4869 20.6077C44.7454 17.3597 46.6705 14.3997 49.1431 11.9107C51.6157 9.42171 54.5831 7.45683 57.8616 6.13772C61.1401 4.8186 64.6599 4.17332 68.2031 4.24183C71.7463 4.31034 75.2374 5.09119 78.4603 6.53602C81.6832 7.98085 84.5693 10.0589 86.9399 12.6415C89.3105 15.2241 91.115 18.2564 92.2419 21.5504C93.3688 24.8445 93.794 28.3302 93.4911 31.7919L95.5659 31.9664Z" fill="url(#paint1_linear_4337_3717)" fillOpacity="0.3"/>
                                            <path d="M39.9495 39.4964C39.9495 44.3437 44.3542 48.2731 42.5923 48.2731C39.1866 48.2731 36.4258 44.3437 36.4258 39.4964C36.4258 34.6492 39.1866 30.7197 42.5923 30.7197C44.3542 30.7197 39.9495 34.6492 39.9495 39.4964Z" fill="url(#paint2_linear_4337_3717)" fillOpacity="0.2" stroke="url(#paint3_linear_4337_3717)" strokeWidth="1.09709"/>
                                            <path d="M91.0399 48.0945C90.9734 49.168 90.4729 50.3641 89.4814 51.5673C88.4914 52.7688 87.0721 53.9015 85.3309 54.8438C83.5922 55.7847 81.4847 56.7055 79.4421 57.1124C77.3988 57.5195 75.0682 58.0844 73.124 58.0837" stroke="#161616" strokeWidth="2.19417"/>
                                            <path d="M93.0889 31.8164C92.1754 31.8164 91.2063 32.0905 90.4238 33.1064C89.5975 34.1796 88.8643 36.2259 88.8643 40.0449C88.8643 43.8639 89.5975 45.9103 90.4238 46.9834C91.2063 47.9994 92.1754 48.2734 93.0889 48.2734C94.9161 48.2734 96.2794 47.3957 97.2314 45.9375C98.2078 44.442 98.7383 42.3364 98.7383 40.0449C98.7383 37.7534 98.2078 35.6478 97.2314 34.1523C96.2794 32.6942 94.9161 31.8164 93.0889 31.8164Z" stroke="url(#paint4_linear_4337_3717)" strokeWidth="2.19417"/>
                                            <path d="M89.6344 40.5923C89.6344 45.4396 91.9139 49.369 93.6741 49.369C97.0767 49.369 99.835 45.4396 99.835 40.5923C99.835 35.7451 98.4111 31.4561 93.6741 31.4561C91.28 31.4561 89.6344 35.7451 89.6344 40.5923Z" fill="url(#paint5_linear_4337_3717)"/>
                                            <rect x="62.5342" y="55.9521" width="10.9709" height="4.38835" rx="2.19417" fill="#1A1A1A"/>
                                            <rect x="63.6309" y="57.0498" width="8.7767" height="2.19417" rx="1.09709" fill="#2E2E2E"/>
                                            <path d="M23.1217 113.001C21.6736 80.141 39.5333 77.7248 54.9796 72.8924C60.3859 93.7684 77.3444 81.1075 85.3892 72.4092C117.73 75.7919 116.282 101.887 116.282 113.001H23.1217Z" fill="url(#paint6_linear_4337_3717)" fillOpacity="0.2"/>
                                            <path d="M52.8602 77.5416C54.8428 74.226 54.5276 70.7627 53.8515 68.0686C67.7297 75.2681 78.7989 66.6476 82.5988 61.4375C80.2195 67.1213 83.5901 71.0684 85.5728 72.3314C63.7644 96.4876 50.8776 80.8571 52.8602 77.5416Z" fill="#0E0E0E"/>
                                            <g filter="url(#filter1_d_4337_3717)">
                                                <circle cx="28.5238" cy="69.1168" r="1.09709" transform="rotate(-90 28.5238 69.1168)" fill="#555555"/>
                                            </g>
                                            <g filter="url(#filter2_d_4337_3717)">
                                                <circle cx="19.1989" cy="75.1507" r="0.548544" transform="rotate(-90 19.1989 75.1507)" fill="#E8E8E8"/>
                                            </g>
                                            <g filter="url(#filter3_d_4337_3717)">
                                                <path d="M9.74479 38.3984H13.4293C13.6985 38.3984 13.9406 38.5623 14.0405 38.8122L15.7319 43.0407C15.8519 43.3407 15.7365 43.6834 15.4594 43.8496L13.8786 44.7981C13.5848 44.9744 13.4736 45.3476 13.6413 45.6464C14.6626 47.4657 16.1658 48.9689 17.9852 49.9903C18.2839 50.158 18.6571 50.0467 18.8334 49.753L19.7819 48.1721C19.9481 47.8951 20.2908 47.7796 20.5908 47.8996L24.8193 49.591C25.0692 49.691 25.2331 49.933 25.2331 50.2022V53.8867C25.2331 54.4344 25.0155 54.9597 24.6282 55.347C24.2409 55.7343 23.7157 55.9518 23.168 55.9518C19.1403 55.7071 15.3414 53.9967 12.4881 51.1434C9.63483 48.2901 7.92445 44.4913 7.67969 40.4635C7.67969 39.9158 7.89726 39.3906 8.28454 39.0033C8.67183 38.616 9.19709 38.3984 9.74479 38.3984Z" stroke="#A2A2A2" strokeWidth="0.329126" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"/>
                                            </g>
                                            <circle cx="111.903" cy="72.408" r="2.13932" fill="url(#paint7_linear_4337_3717)" fillOpacity="0.2" stroke="url(#paint8_linear_4337_3717)" strokeWidth="0.109709"/>
                                            <g filter="url(#filter4_d_4337_3717)">
                                                <circle cx="106.417" cy="41.69" r="1.09709" transform="rotate(-90 106.417 41.69)" fill="#B2B2B2"/>
                                            </g>
                                            <g filter="url(#filter5_d_4337_3717)">
                                                <circle cx="23.0385" cy="8.77694" r="1.09709" transform="rotate(-90 23.0385 8.77694)" fill="#E8E8E8"/>
                                            </g>
                                            <g filter="url(#filter6_d_4337_3717)">
                                                <circle cx="111.354" cy="47.7229" r="0.548544" transform="rotate(-90 111.354 47.7229)" fill="#B2B2B2"/>
                                            </g>
                                            <defs>
                                                <filter id="filter0_di_4337_3717" x="105.189" y="8.64529" width="13.4282" height="13.4282" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.614369"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3717"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3717" result="shape"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.921553"/>
                                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0"/>
                                                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_4337_3717"/>
                                                </filter>
                                                <filter id="filter1_d_4337_3717" x="23.0384" y="63.6312" width="10.971" height="10.971" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="2.19417"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3717"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3717" result="shape"/>
                                                </filter>
                                                <filter id="filter2_d_4337_3717" x="16.8951" y="72.8472" width="4.60736" height="4.60736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.87767"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3717"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3717" result="shape"/>
                                                </filter>
                                                <filter id="filter3_d_4337_3717" x="5.53989" y="36.2586" width="21.8323" height="21.8323" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.987379"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3717"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3717" result="shape"/>
                                                </filter>
                                                <filter id="filter4_d_4337_3717" x="100.932" y="36.2044" width="10.971" height="10.971" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="2.19417"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3717"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3717" result="shape"/>
                                                </filter>
                                                <filter id="filter5_d_4337_3717" x="17.5531" y="3.29134" width="10.971" height="10.971" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="2.19417"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3717"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3717" result="shape"/>
                                                </filter>
                                                <filter id="filter6_d_4337_3717" x="109.05" y="45.4195" width="4.60736" height="4.60736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset/>
                                                    <feGaussianBlur stdDeviation="0.87767"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4337_3717"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4337_3717" result="shape"/>
                                                </filter>
                                                <linearGradient id="paint0_linear_4337_3717" x1="66.7395" y1="6.58398" x2="66.7395" y2="68.0209" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_4337_3717" x1="67.6925" y1="2.19531" x2="67.6925" y2="57.0497" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_4337_3717" x1="39.717" y1="30.7197" x2="39.717" y2="48.2731" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_4337_3717" x1="41.9897" y1="31.236" x2="35.8355" y2="46.7315" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#6E6E6E"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint4_linear_4337_3717" x1="89.6344" y1="31.2683" x2="93.801" y2="49.3702" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#6E6E6E"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint5_linear_4337_3717" x1="95.4466" y1="31.816" x2="95.4466" y2="49.3694" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#434343"/>
                                                    <stop offset="1" stopColor="#1F1F1F"/>
                                                </linearGradient>
                                                <linearGradient id="paint6_linear_4337_3717" x1="69.6653" y1="72.4092" x2="69.6653" y2="113.001" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#252525"/>
                                                </linearGradient>
                                                <linearGradient id="paint7_linear_4337_3717" x1="111.903" y1="70.2139" x2="111.903" y2="74.6022" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#D5D5D5"/>
                                                    <stop offset="1" stopColor="#4B4B4B"/>
                                                </linearGradient>
                                                <linearGradient id="paint8_linear_4337_3717" x1="130.005" y1="71.8595" x2="122.39" y2="82.3776" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="white" stopOpacity="0.5"/>
                                                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                <div
                                    className={`w-full md:h-[133px] p-[20px] rounded-[6px] mt-[20px] mb-[30px] overflow-hidden backdrop-blur-[2px] border border-[#353535] bg-[rgba(0,0,0,0.07)] shadow-[0px_0px_10px_rgba(0,0,0,0.6),_inset_0px_0px_6px_rgba(255,255,255,0.1)] relative`}>
                                    <p className={`font-[Rubik] max-w-[312px] !text-[20px] leading-[120%]`}>Вы видите, где уходят
                                        клиенты <br/> и теряются деньги?</p>

                                    <Image
                                        className={`md:absolute right-0 top-5`}
                                        src="/organization/card-img3.png"
                                        alt="card-img"
                                        width={398}
                                        height={112}
                                    />
                                </div>

                                <p className={`!text-[#ccc]`}>
                                    Если нет — вы уже теряете прибыль. Большинство бизнесов не осознают масштабы потерь:
                                    важные договорённости не фиксируются, клиенты уходят из-за несогласованности,
                                    поручения теряются в потоке задач. Каждое не отслеженное взаимодействие — это
                                    упущенные возможности, невыполненные обещания и недополученная выручка.
                                </p>
                                <p className={`!text-[#ccc] !mb-[50px]`}>
                                    AUDIOSECTOR даёт вам полный контроль над переговорами: от автоматической фиксации и
                                    расшифровки до аналитики по каждому сотруднику. Вы получаете прозрачность процессов,
                                    повышаете эффективность команды и начинаете управлять разговорами как активом, а не
                                    риском.
                                </p>

                                <div
                                    className={`max-w-[600px] m-auto rounded-[8px] flex items-center justify-center mb-[30px]`}>
                                    <img className={`w-full object-cover`} src="/organization/organization-img.png"
                                         alt="img1"/>
                                </div>
                            </div>

                        </section>

                        <section id="audiosector-control">
                            <h2 className={`!text-[32px] !mb-[30px]`}>Контроль начинается с AUDIOSECTOR</h2>
                            <div className={`flex flex-col gap-[30px] mb-[50px]`}>
                                <div>
                                    <h3>Фиксация и анализ всех переговоров</h3>
                                    <ul className={`list-disc pl-[25px]`}>
                                        <li>Ничего не теряется, всё под вашим управлением. Система фиксирует каждый
                                            разговор
                                            — будь то звонок, онлайн-встреча или офлайн-переговоры. Вы получаете полную
                                            историю взаимодействий с клиентами и внутри команды. Вся информация
                                            структурирована и всегда доступна. Это снимает риски человеческого фактора и
                                            позволяет возвращаться к любому моменту переговоров в один клик.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3>
                                        Искусственный интеллект выделяет главное
                                    </h3>
                                    <ul className={`list-disc pl-[25px]`}>
                                        <li>
                                            Ошибки сотрудников, потерянные сделки, слабые места в продажах. Вы больше не
                                            тратите время на прослушивание десятков записей — ИИ сам определяет, где
                                            возникли проблемы. Выявляются недоработки в скриптах, нарушенные обещания,
                                            провалы в логике коммуникации. Это позволяет оперативно обучать команду и
                                            усиливать слабые звенья в воронке.
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>
                                        Контроль выполнения решений
                                    </h3>
                                    <ul className={`list-disc pl-[25px]`}>
                                        <li>
                                            Поручения фиксируются, задачи не игнорируются, всё доводится до результата.
                                            Система распознаёт договорённости и превращает их в задачи, которые
                                            ставятся, отслеживаются и контролируются автоматически. Вы всегда знаете, на
                                            каком этапе выполнение, кто ответственный и есть ли отклонения от плана. Это
                                            особенно важно для управленцев, у которых много проектов и команд.
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>
                                        Скорость
                                    </h3>
                                    <ul className={`list-disc pl-[25px]`}>
                                        <li>
                                            Поиск по переговорам за секунды, никакого хаоса и потерь времени. Забудьте о
                                            часах, потраченных на прослушку записей вручную. Достаточно ввести ключевое
                                            слово — и вы мгновенно находите нужный момент разговора. Это ускоряет работу
                                            руководителей, юристов, продавцов и всей команды. Решения принимаются
                                            быстрее, а споры разбираются на основе фактов.
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>
                                        Интеграция в ваши процессы
                                    </h3>
                                    <ul className={`list-disc pl-[25px]`}>
                                        <li>
                                            Подключение к CRM, колл-центру и BI-системам без сложностей. AUDIOSECTOR
                                            встраивается в вашу текущую IT-среду без глобальных изменений. Всё работает
                                            в привычных для команды интерфейсах: данные автоматически синхронизируются,
                                            отчёты подтягиваются, а информация из разговоров сразу попадает в нужные
                                            модули. Это экономит ресурсы и исключает ручной труд.
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>
                                        Высочайшее качество распознавания
                                    </h3>
                                    <ul className={`list-disc pl-[25px]`}>
                                        <li>
                                            Убираем шумы, распознаём акценты, фиксируем важное. Система работает даже в
                                            сложных условиях: при фоновом шуме, нестабильной связи, акцентированной речи
                                            и перебиваниях. Вы получаете точную и чистую расшифровку, которую можно
                                            использовать в аналитике, обучении и юридических целях. Это позволяет не
                                            упустить ни одной важной детали.
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>
                                        Безлимитный архив
                                    </h3>
                                    <ul className={`list-disc pl-[25px]`}>
                                        <li>
                                            Все записи хранятся и доступны в любой момент. Вы получаете защищённое
                                            облачное хранилище с неограниченным объёмом. Это значит, что вся история
                                            переговоров доступна по дате, теме, участникам — без ограничений по сроку.
                                            Вы всегда можете вернуться к нужному разговору, поднять старые
                                            договорённости или использовать записи как доказательную базу.
                                        </li>
                                    </ul>
                                </div>

                            </div>

                            <div
                                className={`max-w-[600px] m-auto rounded-[8px] flex items-center justify-center mb-[30px]`}>
                                <img className={`w-full object-cover`} src="/organization/organization-img1.png"
                                     alt="img1"/>
                            </div>
                        </section>

                        <section id="first-month-benefits" className={`!mb-0`}>
                            <h2 className={`!text-[32px] !mb-[30px]`}>Что Вы получаете уже в первый месяц</h2>

                            <div className="flex flex-wrap gap-[30px] mb-[30px]">
                                {benefits.map((text, idx) => (
                                    <div key={idx} className="w-full max-w-[380px] h-[133px]">
                                        <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M26.1875 1.5L13.0625 16.5L7.4375 10.875M7.4375 16.5L1.8125 10.875M20.5625 1.5L12.5938 10.6406" stroke="#878787" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <p className="mt-[15px]">{text}</p>
                                    </div>
                                ))}
                            </div>

                            <p>
                                Если вы не управляете переговорами — они управляют вашим бизнесом.
                                Каждое незафиксированное слово, неуслышанная деталь или забытое обещание превращаются в убытки, потерю клиентов и хаос в команде.
                            </p>
                            <p>
                                С AUDIOSECTOR вы не просто записываете разговоры —
                                вы получаете систему, которая фиксирует, анализирует и усиливает каждый этап коммуникации: от звонка до сделки.
                            </p>
                            <p>
                                Это не вложение в IT. Это вложение в контроль, рост и возврат денег, которые уже сейчас утекают.
                            </p>
                            <p className={`!mb-0`}>
                                Настоящий бизнес начинается с прозрачности.
                                И она начинается с того, чтобы каждый разговор начал работать на результат.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

        </>
    );
}
