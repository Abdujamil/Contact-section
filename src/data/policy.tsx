import {StaticImageData} from "next/image";
import {ReactNode} from "react";

interface AsideItem {
    id: string;
    title: string;
}

interface FaqItem {
    id: number;
    num: string;
    title: string;
    slug: string;
    fullAnswer: ReactNode;
    aside: AsideItem[];
    largeImgSrc: string | StaticImageData;
    editorId: number;
}

export const policyData: FaqItem[] = [
    {
        id: 1,
        num: "1",
        editorId: 1,
        title: "Транскрибация вакансии без опыта работы для школьников?",
        slug: "transkribatsiya-lektsii",
        largeImgSrc: "/blgLg1.png",
        fullAnswer: (
            <>
            </>
        ),

        aside: [
            {
                id: "#introduction",
                title: "Введение",
            },
            {
                id: "#data-collection",
                title: "Интеллектуальные права",
            },
            {
                id: "#data-usage",
                title: "Конфиденциальность и защита информации",
            },
            {
                id: "#dop-sved",
                title: "Дополнительные сведения",
            },
        ],
    },
    {
        id: 2,
        num: "2",
        editorId: 2,
        title: "Транскрибация вакансии без опыта работы для школьников?",
        slug: "transkribatsiya-lektsii",
        largeImgSrc: "/blgLg1.png",
        fullAnswer: (
            <>

            </>
        ),

        aside: [
            {
                id: "#obshchie-polozheniya-terminy-i-opredeleniya",
                title: "1. Общие положения. Термины и определения",
            },
            {
                id: "#predmet-dogovora",
                title: "2. Предмет договора",
            },
            {
                id: "#kachestvo-uslug",
                title: "3. Качество услуг",
            },
            {
                id: "#poryadok-oplaty",
                title: "4. Порядок оплаты",
            },
            {
                id: "#sroki-i-usloviya-okazaniya-uslug",
                title: "5. Сроки и условия оказания услуг",
            },
            {
                id: "#otvetstvennost-storon",
                title: "6. Ответственность сторон",
            },
            {
                id: "#izmenenie-i-rastorzhenie-dogovora",
                title: "7. Изменение и расторжение договора",
            },
            {
                id: "#razreshenie-sporov",
                title: "8. Разрешение споров",
            },
            {
                id: "#zaklyuchitelnye-polozheniya",
                title: "9. Заключительные положения",
            },
            {
                id: "#rekvizity-ispolnitelya",
                title: "10. Реквизиты Исполнителя",
            },
        ],
    },
    {
        id: 3,
        num: "3",
        editorId: 3,
        title: "Транскрибация вакансии без опыта работы для школьников?",
        slug: "transkribatsiya-lektsii",
        largeImgSrc: "/blgLg1.png",
        fullAnswer: (
            <>

            </>
        ),

        aside: [
            {
                id: "#litsenzii-i-pravovoy-status",
                title: "Лицензии и правовой статус: гарантия надёжности и прозрачности",
            },
            {
                id: "#svidetelstvo-o-registratsii",
                title: "Свидетельство о регистрации программы для ЭВМ",
            },
            {
                id: "#akkreditovannaya-it-kompaniya",
                title: "Мы аккредитованная IT-компания",
            },
            {
                id: "#pochemu-licenzii-vazhny",
                title: "Почему наличие лицензий имеет значение?",
            },
            {
                id: "#poprobuyte-servis",
                title: "Попробуйте сервис — 30 минут бесплатно",
            },
        ],
    },
];
