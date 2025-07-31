import {ReactNode} from "react";

interface AsideItem {
    id: string;
    title: string;
}

interface organizationItem {
    id: number;
    num: string;
    fullAnswer: ReactNode;
    aside: AsideItem[];
}

export const organizationData: organizationItem[] = [
    {
        id: 1,
        num: "1",
        fullAnswer: (
            <>
            </>
        ),

        aside: [
            {
                id: "#speech-to-text",
                title: "Автоматическая транскрибация речи в текст",
            },
            {
                id: "#our-offer",
                title: "Что мы предлагаем",
            },
            {
                id: "#why-audiosector",
                title: "Почему выбирают AUDIOSECTOR",
            },
            {
                id: "#application-areas",
                title: "Сферы применения",
            },
            {
                id: "#our-approach",
                title: "Наш подход",
            },
        ]
    },
    {
        id: 2,
        num: "2",
        fullAnswer: (
            <>

            </>
        ),

        aside: [
            {
                id: "#communication-loss-costs",
                title: "Потеря управления коммуникациями = потеря денег",
            },
            {
                id: "#who-controls-negotiations",
                title: "Кто управляет вашими переговорами?",
            },
            {
                id: "#audiosector-control",
                title: "Контроль начинается с AUDIOSECTOR",
            },
            {
                id: "#first-month-benefits",
                title: "Что Вы получаете уже в первый месяц",
            },
        ]
    },
    {
        id: 4,
        num: "4",
        fullAnswer: (
            <>

            </>
        ),

        aside: [
            {
                id: "what-is-api",
                title: "Что такое API",
            },
            {
                id: "target-audience",
                title: "Для кого разработан API",
            },
            {
                id: "api-capabilities",
                title: "Возможности AUDIOSECTOR API",
            },
            {
                id: "integration-process",
                title: "Простая и быстрая интеграция",
            },
        ],

    },
    {
        id: 3,
        num: "3",
        fullAnswer: (
            <>

            </>
        ),

        aside: [
            {
                id: "introduction",
                title: "Введение",
            },
            {
                id: "workflow",
                title: "Порядок работы",
            },
            {
                id: "base-url",
                title: "Базовый URL — https://rest.audiosector.ru/v1",
            },
            {
                id: "endpoints",
                title: "Эндпоинты",
            },
            // {
            //     id: "error-codes",
            //     title: "Общие коды возвращаемых ошибок",
            // },
        ],
    },
];
