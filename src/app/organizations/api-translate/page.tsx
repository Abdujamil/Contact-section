"use client";
import styles from "@/app/page.module.scss";
import React from "react";
import HeaderStyles from "@/components/header/Header.module.css";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";

const apiCards = [
    {
        title: "Бизнес",
        items: [
            "Автоматизация встреч и звонков.",
            "Быстрое формирование отчётов.",
            "Интеграция с CRM, чат-ботами и внутренними сервисами",
        ],
        description: "Ускорение коммуникаций и снижение издержек на рутинные задачи.",
    },
    {
        title: "Образование",
        items: [
            "Транскрибация лекций и семинаров.",
            "Создание субтитров учебных материалов.",
            "Повышение доступности контента для иностранных слушателей.",
        ],
        description: "Цифровизация образовательного контента без лишней нагрузки на преподавателей.",
    },
    {
        title: "Call-центр",
        items: [
            "Расшифровка звонков и построение диалогов.",
            "Контроль качества обслуживания и выявление нарушений.",
            "Анализ клиентских запросов и скриптов.",
        ],
        description: "Прозрачность работы операторов и усиление контроля за клиентским опытом.",
    },
    {
        title: "Журналистика",
        items: [
            "Точное преобразование интервью, комментариев, подкастов в текст.",
            "Ускорение публикаций и монтажей.",
            "Добавление субтитров к видео для соцсетей.",
        ],
        description: "Экономия времени при подготовке материалов и рост охвата.",
    },
    {
        title: "Юриспруденция",
        items: [
            "Протоколирование судебных заседаний, допросов, слушаний.",
            "Хранение стенограмм с таймкодами и спикерами.",
            "Обеспечение юридической точности.",
        ],
        description: "Надёжная текстовая фиксация для работы с доказательствами и документами.",
    },
    {
        title: "Бюро переводов",
        items: [
            "Расшифровка аудио- и видеофайлов для последующего перевода.",
            "Возможность автоматического перевода и озвучки.",
            "Форматы: DOCX, SRT, TXT для локализации.",
        ],
        description: "Снижение трудозатрат при адаптации мультимедийного контента.",
    },
    {
        title: "Здравоохранение",
        items: [
            "Преобразование голосовых записей врачей в текст.",
            "Подготовка медицинских протоколов, заключений, рекомендаций.",
            "Использование в телемедицине и приёмах с диктофоном.",
        ],
        description: "Минимизация ручного труда и повышение точности медицинской документации.",
    },
    {
        title: "Гос. учреждения",
        items: [
            "Протоколирование заседаний, совещаний, интервью.",
            "Ведение стенограмм в контролируемой среде.",
            "Интеграция в информационные системы и документооборот.",
        ],
        description: "Соблюдение требований регламента и усиление контроля.",
    },
];

const miniCards = [
    "95% точности при распознавании речи",
    "100+ языков, включая русский и английский",
    "Автоматическая расстановка пунктуации",
    "Форматы вывода: TXT, DOCX, SRT, VTT, JSON",
    "Определение спикеров транскрибации",
    "Поддержка обработки видеоконференций",
];


export default function OrganizationWhereDoYouLoseContent() {
    return (
        <>
            <Breadcrumbs organizationApiTranslate={true}/>
            <div>
                <div
                    className={`${styles.BlogPageContent} mb-[115px] text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
                >
                    <div className="oferta-content policy-content">
                        {/*Блок попробовать*/}
                        <div className={`w-full flex items-center justify-center mb-[20px] md:mb-[30px]`}>
                            <div
                                className={`${styles.editorTryBlockApi} ${styles.editorTryBlock} w-full max-w-[560px] text-center px-[39px] py-[40px] rounded-[8px] border !border-[#353535]`}
                            >
                                <h3
                                    className={`${styles.txtGradientRight} w-fit m-auto !text-[32px] !md:text-[32px] !leading-[120%] !mb-[20px]`}
                                >
                                    Хотите подключить API?
                                </h3>
                                <p className={`max-w-[352px] m-auto text-[#adadad] !leading-[140%] md:!text-[18px] text-[16px] !mb-[20px]`}>
                                    Упростите транскрибацию уже сегодня — с помощью API для бизнеса
                                </p>

                                <div className="relative w-full max-w-[220px] m-auto h-[51px] !overflow-hidden ">
                                    <button
                                        className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["blogTryBtn"]} border !border-[#353535] w-full !h-full group flex items-center !justify-between md:!justify-center`}
                                        data-text=""
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                    <span
                                        className="font-normal md:text-[20px] text-[18px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc]">
                                      Документация
                                    </span>

                                        <svg
                                            className={`${styles.sendIconLeft}  transition-all !duration-[.13s] ease-in`}
                                            width="18"
                                            height="24"
                                            viewBox="0 0 18 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.625 0.871195V1.74239L14.7964 1.75176L17.9732 1.76581L17.9893 11.9859L18 22.2108H14.8125H11.625V23.1054V24L11.5018 23.9766C11.4375 23.9625 8.94643 23.5691 5.97321 23.1007C2.99464 22.637 0.433928 22.2342 0.27857 22.2061L0 22.1593V11.9953C0 6.4075 0.0160713 1.83607 0.0375004 1.83607C0.0857143 1.83607 11.3571 0.0562077 11.5018 0.0234203L11.625 1.90735e-06V0.871195ZM11.625 12V20.5714H13.8482H16.0714V12V3.42857H13.8482H11.625V12ZM9.39107 11.2974C9.13929 11.4286 9.03214 11.6393 9.03214 12C9.03214 12.3607 9.13929 12.5714 9.39107 12.7026C9.63214 12.8337 9.86786 12.8197 10.0768 12.6698C10.2911 12.5105 10.3929 12.2998 10.3929 12C10.3929 11.7002 10.2911 11.4895 10.0768 11.3302C9.86786 11.1803 9.63214 11.1663 9.39107 11.2974Z"
                                                fill="#adadad"
                                            />
                                        </svg>
                                    </button>
                                    <div className={styles.highlight}/>
                                </div>
                            </div>
                        </div>
                        <section id="what-is-api">
                            <h2>Что такое API</h2>
                            <p>
                                API (Application Programming Interface) — это инструмент, который позволяет вашей
                                системе автоматически взаимодействовать с нашей платформой. Это как «цифровой мост»,
                                благодаря которому процессы проходят без ручного вмешательства: быстро, стабильно и
                                точно.
                            </p>
                            <h3>
                                Простой пример
                            </h3>

                            <p>
                                Допустим, вы принимаете звонки или собираете голосовые сообщения от клиентов — например,
                                на горячей линии, в телеграм-боте, в call-центр или через CRM. Обычно такие записи нужно
                                выгружать вручную и передавать на расшифровку, что отнимает время и требует
                                человеческого участия.
                            </p>
                            <p>
                                С API всё проще: ваша система автоматически отправляет запись — наша платформа её
                                расшифровывает и возвращает готовый текст. Это может происходить с каждым новым звонком,
                                сообщением или файлом — без пауз и ожиданий. Вы получаете точный текст прямо в нужный
                                вам инструмент: CRM, таблицу, документ или чат.
                            </p>
                        </section>

                        <section id="target-audience">
                            <h2>Для кого разработан API</h2>

                            <div className={`flex flex-wrap items-center gap-5`}>
                                {apiCards.map((card, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.apiCard} p-[20px] w-full md:max-w-[388px] rounded-[6px] border border-[#353535]`}
                                    >
                                        <h4 className="text-[#adadad] text-[24px] leading-[120%] mb-[15px]">{card.title}</h4>

                                        <ul className="text-[16px] space-y-[5px] list-disc pl-[20px] text-[#ccc] mb-[15px]">
                                            {card.items.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>

                                        <p className="!text-[#878787] text-[16px] !mb-0">{card.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="max-w-[600px] m-auto rounded-[8px] flex items-center justify-center my-[30px]">
                                <img className="w-full object-cover" alt="img1"
                                     src="/organization/organization-img2.png"/></div>
                        </section>

                        <section id="api-capabilities">
                            <h2>Возможности AUDIOSECTOR API</h2>

                            <div
                                className="flex flex-wrap items-center gap-2 mb-[16px] justify-center md:justify-start">
                                {miniCards.map((text, index) => (
                                    <div
                                        key={index}
                                        className="w-full max-w-[260px] h-[134px] rounded-[6px] border p-5 flex flex-col items-center justify-center text-center border-[#353535] backdrop-blur-[2px] bg-[rgba(0,0,0,0.07)] shadow-[0px_0px_10px_rgba(0,0,0,0.6),_inset_0px_0px_6px_rgba(255,255,255,0.1)]"
                                    >
                                        <svg
                                            width="28"
                                            height="18"
                                            viewBox="0 0 28 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M26.1875 1.5L13.0625 16.5L7.4375 10.875M7.4375 16.5L1.8125 10.875M20.5625 1.5L12.5938 10.6406"
                                                stroke="#CCCCCC"
                                                strokeWidth="1.875"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <p className="mt-[10px] !mb-0 text-[#ccc] text-[14px] leading-[120%]">{text}</p>
                                    </div>
                                ))}
                            </div>

                            <p>
                                Интерфейс API поддерживает работу как с одиночными файлами, так и с массовыми
                                загрузками, включая потоковые сценарии. Гибкая настройка параметров позволяет
                                адаптировать систему под любые задачи: от расшифровки интервью до локализации
                                мультимедийного архива.
                            </p>

                        </section>

                        <section id="integration-process" className={`!mb-0`}>
                            <h2>Простая и быстрая интеграция</h2>
                            <p>
                                Мы предлагаем два удобных варианта подключения — в зависимости от структуры вашей
                                компании:
                            </p>

                            <ul className={`list-disc pl-[20px] mb-[16px]`}>
                                <li>
                                    Подключение по серверу. Доступ к API получает один конкретный сервер. Подходит для
                                    компаний с централизованной инфраструктурой, когда запросы поступают из одного
                                    места.
                                </li>
                                <li>
                                    Подключение по организации. API можно использовать с разных серверов, если они
                                    принадлежат одному юридическому лицу. Это удобно для компаний с филиалами,
                                    региональными офисами или распределёнными командами.
                                </li>
                            </ul>

                            <h3>
                                Как работает API транскрибации
                            </h3>
                            <p>
                                Существует два способа передать файл на расшифровку:
                            </p>

                            <p>
                                1. Передача файла в теле запроса
                            </p>
                            <p>
                                Вы сразу отправляете аудио- или видеофайл — он поступает в обработку и в течение
                                короткого времени возвращается в виде текста.
                            </p>

                            <p>
                                2. Передача ссылки на файл
                            </p>
                            <p>
                                Вы указываете прямую ссылку на файл (например, из вашего хранилища), и система сама его
                                скачивает и расшифровывает. Это удобно, если вы не хотите перегружать основной сервер.
                            </p>
                            <p>
                                По умолчанию мы возвращаем результат в структурированном формате JSON — это удобно для
                                любой автоматической обработки и интеграции с другими системами (например, для создания
                                задач, аналитики или отчётов).
                            </p>


                            <p>
                                Дополнительно мы можем отдавать готовый текст и в привычных форматах:
                            </p>

                            <ul className={`list-disc pl-[18px] mb-[16px]`}>
                                <li>
                                    Word (.docx)
                                </li>
                                <li>
                                    Excel (.xlsx)
                                </li>
                                <li>
                                    PDF
                                </li>
                                <li>
                                    TXT
                                </li>
                                <li>
                                    SRT (формат субтитров для видео)
                                </li>
                            </ul>

                            <p className={`!mb-5`}>
                                Интеграция занимает от 1 часа до 1 дня — в зависимости от ваших задач. Команда поддержки
                                поможет адаптировать API под ваш продукт, инфраструктуру и целевую нагрузку
                            </p>

                            <div className={`relative !w-[220px] !overflow-hidden`}>
                                <button
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["customBtn"]} border !border-[#353535] transition-all !duration-[.13s] ease-in cursor-pointer md:!w-[220px] !w-full !h-[51px] m-auto !rounded-[4px] group flex items-center !justify-center`}
                                >
                                    <span
                                        className={`!w-full text-[20px] !transition-all !duration-[.13s] !ease-in `}
                                    >
                                      Получить ключ API
                                    </span>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}