"use client";
import styles from "@/app/page.module.scss";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import HeaderStyles from "@/components/header/Header.module.css";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import Close from "@/components/closeIcon/close";
import {motion} from "framer-motion";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";


interface SlideItem {
    src: string;
    alt: string;
}

interface ImageModalProps {
    isOpen: boolean;
    slides: SlideItem[];
    onClose: () => void;
}

export default function Page() {
    const [openFirst, setOpenFirst] = useState(false);
    const [openSecond, setOpenSecond] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const slidesFirst = [
        {src: "/lg-sved-o-reagist.png", alt: "Свидетельство о регистрации программы для ЭВМ"},
    ];
    const slidesSecond = [
        {src: "/lg-sved-o-reagist-1.png", alt: "Выписка из реестра аккредитованных организаций"},
    ];

    // Закрытие модального окна по Escape
    useEffect(() => {
        interface KeyDownEvent extends KeyboardEvent {
            key: string;
        }

        const handleKeyDown = (e: KeyDownEvent): void => {
            if (e.key === "Escape") {
                setOpenFirst(false);
                setOpenSecond(false);
            }
        };

        if (openFirst || openSecond) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden"; // Блокируем прокрутку фона
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [openFirst, openSecond]);

    const closeModal = () => {
        setOpenFirst(false);
        setOpenSecond(false);
        setCurrentImageIndex(0);
    };

    const ImageModal: React.FC<ImageModalProps> = ({isOpen, slides, onClose}) => {
        if (!isOpen) return null;

        return (
            <div
                className="fixed inset-0 z-[9999999] w-full flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
                onClick={onClose}
            >
                {/* Фон модального окна */}
                <div
                    className="absolute inset-0 bg-black/70 transition-opacity duration-300"
                    onClick={onClose}
                />

                {/* Контейнер изображения */}
                <motion.div
                    initial={{y: -200}}
                    animate={{y: 0}}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                    }}
                >
                    <div
                        className="relative max-w-[95vw] max-h-[95vh] p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка закрытия */}
                        <Close onClick={onClose}/>

                        {/* Изображение */}
                        <div className="w-[624px] rounded-lg shadow-2xl">
                            <div className="relative flex items-center md:justify-center justify-start">
                                {/* Заголовок изображения */}
                                <div
                                    className="md:w-full w-[350px] absolute top-[-70px] left-0 right-0 bg-gradient-to-t to-transparent md:p-4 p-2">
                                    <h3 className="text-center text-white md:text-[20px] text-[16px] font-bold">
                                        {slides[currentImageIndex].alt}
                                    </h3>
                                </div>
                                <Image
                                    src={slides[currentImageIndex].src}
                                    alt={slides[currentImageIndex].alt}
                                    width={800}
                                    height={1000}
                                    className="w-[480px] h-auto max-w-[90vw] max-h-[85vh] object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Индикатор загрузки (опционально для будущих изображений) */}
                        {slides.length > 1 && (
                            <div className="flex justify-center mt-4 gap-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                            index === currentImageIndex
                                                ? "bg-white"
                                                : "bg-white/40 hover:bg-white/70"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

            </div>
        );
    };

    return (
        <>
            <Breadcrumbs policyUrLicense={true}/>
            <div
                className={`${styles.BlogPageContent} mb-[120px] text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
            >
                <div className="oferta-content policy-content">
                    <section id="litsenzii-i-pravovoy-status" className="scroll-mt-[80px]">
                        <h2>
                            Лицензии и правовой статус: гарантия надёжности и прозрачности
                        </h2>
                        <h3>Мы работаем легально и прозрачно</h3>

                        <p>
                            Наша компания работает в сфере автоматической транскрибации
                            аудио и видео в текст и уделяет особое внимание юридической
                            прозрачности.
                        </p>
                        <p>
                            Каждый клиент Audiosector может быть уверен: мы работаем
                            легально, соблюдая все требования законодательства РФ и действуя
                            на основании официально зарегистрированного программного
                            обеспечения.
                        </p>

                        <h3>Почему это важно при работе с транскрибацией?</h3>
                        <ul className={`list-disc pl-[20px]`}>
                            <li>
                                Обработка аудио — это не просто конвертация звука в текст.
                                Мы имеем дело с реальными данными: деловыми встречами,
                                переговорами, лекциями, исследованиями. Доверие к нам строится
                                на:
                            </li>
                            <li>Прозрачности процессов</li>
                            <li>Безопасности хранения и передачи данных</li>
                            <li>Юридически защищённой технологии</li>
                        </ul>
                    </section>
                    <section id="svidetelstvo-o-registratsii" className="scroll-mt-[80px] !leading-[130%]">
                        <h2>Свидетельство о регистрации программы для ЭВМ</h2>

                        <div
                            className={`flex flex-wrap md:flex-nowrap items-start justify-center gap-[30px] mb-[20px]`}>
                            <div className={`w-full max-w-[260px]`}>
                                <Image
                                    className={`cursor-pointer`}
                                    onClick={() => setOpenFirst(true)}
                                    src="/sved-o-reagist.png"
                                    alt="Свидетельство о регистрации"
                                    width={280}
                                    height={352}
                                    priority
                                    fetchPriority="high"
                                />
                            </div>

                            <div>
                                <p className={`!mb-[11px]`}>
                                    Сердце нашей платформы — интеллектуальная система
                                    транскрибации, зарегистрированная в Роспатенте как программа
                                    для ЭВМ. Это официально подтверждает её уникальность
                                    и авторское право.
                                </p>

                                <h3>Что даёт регистрация пользователям?</h3>

                                <p className={`!mb-[11px]`}>
                                    Легальное использование: вы получаете доступ к защищённому,
                                    надёжному сервису
                                </p>
                                <p className={`!mb-[11px]`}>
                                    Технологическая независимость: мы не используем открытые
                                    или сомнительные решения — только собственные разработки
                                </p>
                                <p className={`!mb-[11px]`}>
                                    Уникальность технологии: архитектура, логика, интерфейс
                                    и алгоритмы защищены законом
                                </p>

                                <div className="relative w-full max-w-[220px] h-[51px] !overflow-hidden ">
                                    <button
                                        className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["policyBtn1"]} ${styles["blogTryBtn"]} border !border-[#353535] w-full !h-full group flex items-center !justify-between md:!justify-center`}
                                        data-text=""
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                    <span
                                        className="font-normal md:text-[20px] text-[18px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#adadad]">
                                      Свидетельство
                                    </span>



                                        <svg
                                            className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.53846 5.46178C3.53846 4.95175 3.74107 4.46261 4.10172 4.10196C4.46236 3.74132 4.95151 3.53871 5.46154 3.53871H6.61538V7.00024C6.61538 7.25279 6.66513 7.50286 6.76177 7.73617C6.85841 7.96949 7.00007 8.18149 7.17864 8.36006C7.53929 8.72071 8.02843 8.92332 8.53846 8.92332H14.6923C14.9448 8.92332 15.1949 8.87358 15.4282 8.77694C15.6616 8.68029 15.8736 8.53864 16.0521 8.36006C16.2307 8.18149 16.3724 7.96949 16.469 7.73617C16.5656 7.50286 16.6154 7.25279 16.6154 7.00024V3.56947C16.9995 3.63984 17.3532 3.82551 17.6292 4.10178L19.8985 6.37101C20.077 6.54962 20.2187 6.76166 20.3153 6.99501C20.4119 7.22836 20.4616 7.47845 20.4615 7.73101V18.5387C20.4616 18.982 20.3085 19.4118 20.0282 19.7552C19.7478 20.0986 19.3574 20.3347 18.9231 20.4233V13.9233C18.9231 13.4133 18.7205 12.9241 18.3598 12.5635C17.9992 12.2029 17.51 12.0002 17 12.0002H7C6.48997 12.0002 6.00083 12.2029 5.64018 12.5635C5.27953 12.9241 5.07692 13.4133 5.07692 13.9233V20.4233C4.64255 20.3347 4.25216 20.0986 3.97181 19.7552C3.69146 19.4118 3.53837 18.982 3.53846 18.5387V5.46178ZM6.61538 20.4618V13.9233C6.61538 13.8213 6.65591 13.7235 6.72804 13.6514C6.80017 13.5792 6.89799 13.5387 7 13.5387H17C17.102 13.5387 17.1998 13.5792 17.272 13.6514C17.3441 13.7235 17.3846 13.8213 17.3846 13.9233V20.4618H6.61538ZM15.0769 3.53871V7.00024C15.0769 7.10225 15.0364 7.20008 14.9643 7.27221C14.8921 7.34434 14.7943 7.38486 14.6923 7.38486H8.53846C8.43646 7.38486 8.33863 7.34434 8.2665 7.27221C8.19437 7.20008 8.15385 7.10225 8.15385 7.00024V3.53871H15.0769ZM5.46154 2.00024C4.54348 2.00024 3.66303 2.36494 3.01386 3.01411C2.3647 3.66327 2 4.54373 2 5.46178V18.5387C2 19.4568 2.3647 20.3372 3.01386 20.9864C3.66303 21.6355 4.54348 22.0002 5.46154 22.0002H18.5385C19.4565 22.0002 20.337 21.6355 20.9861 20.9864C21.6353 20.3372 22 19.4568 22 18.5387V7.73101C22 7.27644 21.9105 6.82631 21.7365 6.40633C21.5626 5.98636 21.3076 5.60476 20.9862 5.28332L18.7169 3.01409C18.3955 2.69266 18.0139 2.43768 17.5939 2.26373C17.1739 2.08977 16.7238 2.00024 16.2692 2.00024H5.46154Z" fill="#ADADAD"/>
                                        </svg>
                                    </button>
                                    <div className={styles.highlight}/>
                                </div>
                            </div>
                        </div>
                        <h3>Безопасность начинается с кода</h3>
                        <p>
                            Регистрация ПО — это не просто формальность. Это основа
                            для доверия, особенно если вы работаете с конфиденциальной
                            информацией, медицинскими записями или правовыми материалами.
                            Вы передаёте аудио в систему, за безопасность которой отвечает
                            закон.
                        </p>
                    </section>
                    <section id="akkreditovannaya-it-kompaniya" className="scroll-mt-[80px]">
                        <h2>Мы аккредитованная IT-компания</h2>
                        <p>
                            ООО «АУДИОСЕКТОР» включено в реестр аккредитованных IT-компаний.
                            Это не просто статус — это:
                        </p>
                        <ul className={`list-disc pl-[40px]`}>
                            <li>Подтверждение соответствия отраслевым стандартам</li>
                            <li>Право на льготное налогообложение и IT-поддержку</li>
                            <li>
                                Возможность участвовать в тендерах, работать с госсектором и
                                крупным бизнесом
                            </li>
                        </ul>

                        <div
                            className={`flex flex-wrap md:flex-nowrap items-start justify-center gap-[30px] my-[20px]`}>
                            <div className={`w-full max-w-[260px]`}>
                                <Image
                                    className={`cursor-pointer`}
                                    onClick={() => setOpenSecond(true)}
                                    src="/sved-o-reagist-1.png"
                                    alt="Аккредитация IT-компании"
                                    width={280}
                                    height={352}
                                />
                            </div>

                            <div className={`flex flex-col justify-between h-[352px]`}>
                                <div>
                                    <h3>Мы соблюдаем требования:</h3>
                                    <ul className={`list-disc pl-[20px] mb-[20px]`}>
                                        <li>
                                            {" "}
                                            Федерального закона №152-ФЗ «О персональных данных»
                                        </li>
                                        <li>
                                            Федерального закона №149-ФЗ «Об информации,
                                            информационных технологиях и защите информации»
                                        </li>
                                        <li>
                                            Иных нормативных актов в области цифровых услуг и
                                            хранения данных
                                        </li>
                                    </ul>

                                    <h3>Договор и публичная оферта</h3>
                                    <p>
                                        Пользовательский доступ к платформе регулируется
                                        договором-офертой, размещённой на сайте. Это даёт
                                        вам юридическую защиту при использовании платформы.
                                    </p>
                                </div>

                                <div className="relative w-full max-w-[251px] h-[51px] !overflow-hidden ">
                                    <button
                                        className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["policyBtn2"]} ${styles["blogTryBtn"]} border !border-[#353535] w-full !h-full group flex items-center !justify-between md:!justify-center`}
                                        data-text=""
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                    <span
                                        className="font-normal md:text-[20px] text-[18px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#adadad]">
                                      Выписка из реестра
                                    </span>

                                        <svg
                                            className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.53846 5.46178C3.53846 4.95175 3.74107 4.46261 4.10172 4.10196C4.46236 3.74132 4.95151 3.53871 5.46154 3.53871H6.61538V7.00024C6.61538 7.25279 6.66513 7.50286 6.76177 7.73617C6.85841 7.96949 7.00007 8.18149 7.17864 8.36006C7.53929 8.72071 8.02843 8.92332 8.53846 8.92332H14.6923C14.9448 8.92332 15.1949 8.87358 15.4282 8.77694C15.6616 8.68029 15.8736 8.53864 16.0521 8.36006C16.2307 8.18149 16.3724 7.96949 16.469 7.73617C16.5656 7.50286 16.6154 7.25279 16.6154 7.00024V3.56947C16.9995 3.63984 17.3532 3.82551 17.6292 4.10178L19.8985 6.37101C20.077 6.54962 20.2187 6.76166 20.3153 6.99501C20.4119 7.22836 20.4616 7.47845 20.4615 7.73101V18.5387C20.4616 18.982 20.3085 19.4118 20.0282 19.7552C19.7478 20.0986 19.3574 20.3347 18.9231 20.4233V13.9233C18.9231 13.4133 18.7205 12.9241 18.3598 12.5635C17.9992 12.2029 17.51 12.0002 17 12.0002H7C6.48997 12.0002 6.00083 12.2029 5.64018 12.5635C5.27953 12.9241 5.07692 13.4133 5.07692 13.9233V20.4233C4.64255 20.3347 4.25216 20.0986 3.97181 19.7552C3.69146 19.4118 3.53837 18.982 3.53846 18.5387V5.46178ZM6.61538 20.4618V13.9233C6.61538 13.8213 6.65591 13.7235 6.72804 13.6514C6.80017 13.5792 6.89799 13.5387 7 13.5387H17C17.102 13.5387 17.1998 13.5792 17.272 13.6514C17.3441 13.7235 17.3846 13.8213 17.3846 13.9233V20.4618H6.61538ZM15.0769 3.53871V7.00024C15.0769 7.10225 15.0364 7.20008 14.9643 7.27221C14.8921 7.34434 14.7943 7.38486 14.6923 7.38486H8.53846C8.43646 7.38486 8.33863 7.34434 8.2665 7.27221C8.19437 7.20008 8.15385 7.10225 8.15385 7.00024V3.53871H15.0769ZM5.46154 2.00024C4.54348 2.00024 3.66303 2.36494 3.01386 3.01411C2.3647 3.66327 2 4.54373 2 5.46178V18.5387C2 19.4568 2.3647 20.3372 3.01386 20.9864C3.66303 21.6355 4.54348 22.0002 5.46154 22.0002H18.5385C19.4565 22.0002 20.337 21.6355 20.9861 20.9864C21.6353 20.3372 22 19.4568 22 18.5387V7.73101C22 7.27644 21.9105 6.82631 21.7365 6.40633C21.5626 5.98636 21.3076 5.60476 20.9862 5.28332L18.7169 3.01409C18.3955 2.69266 18.0139 2.43768 17.5939 2.26373C17.1739 2.08977 16.7238 2.00024 16.2692 2.00024H5.46154Z" fill="#ADADAD"/>
                                        </svg>
                                    </button>
                                    <div className={styles.highlight}/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="pochemu-licenzii-vazhny" className="scroll-mt-[80px]">
                        <h2>Почему наличие лицензий имеет значение?</h2>
                        <p>
                            В сфере обработки данных и автоматизации аудио важна не только
                            технология, но и юридическая прозрачность.
                        </p>

                        <p>
                            Когда вы передаёте нам разговоры, звонки, внутренние совещания и материалы клиентов — вы
                            доверяете нам самое чувствительное: голосовые данные, за которыми стоят люди, решения и
                            деньги.
                        </p>

                        <h3>Мы понимаем, как ценно ваше доверие — именно поэтому:</h3>
                        <ul className={`list-disc pl-[20px]`}>
                            <li>
                                Используем только легально зарегистрированное программное обеспечение с официальными
                                договорами и лицензиями;
                            </li>
                            <li>
                                Гарантируем защиту всех передаваемых данных — соответствуем требованиям ФЗ-152 и
                                общим нормам GDPR для зарубежных партнёров;
                            </li>
                            <li>
                                Соблюдаем все правовые нормы и регламенты, включая договорные обязательства, NDA и
                                внутреннюю политику конфиденциальности;
                            </li>
                            <li>
                                Имеем полный комплект юридических документов для сотрудничества с корпоративными
                                клиентами, образовательными учреждениями, медицинскими организациями и
                                государственными структурами.
                            </li>
                        </ul>

                        <p className={`mt-[20px]`}>
                            Вся документация доступна на этой странице — мы открыты, прозрачны и надёжны.
                        </p>
                    </section>
                    <section id="poprobuyte-servis" className="scroll-mt-[80px] !mb-0">
                        <h2>Попробуйте сервис — 30 минут бесплатно</h2>
                        <p>Хотите убедиться в качестве работы AUDIOSECTOR? Мы предлагаем бесплатный тест-доступ:
                            никаких рисков, никаких скрытых условий.</p>

                        <h3>Что входит в бесплатный доступ?</h3>
                        <ul className={`list-disc pl-[20px]`}>
                            <li>
                                Распознавание аудио и видео до 30 минут — загрузите любой файл и получите
                                расшифровку уже через несколько минут;
                            </li>
                            <li>
                                Поддержка деловой, технической и юридической терминологии — результат точный,
                                структурированный, с учётом профессиональной специфики;
                            </li>
                            <li>
                                Автоматическая расстановка пунктуации и деление по репликам, что делает текст
                                читаемым и готовым к работе;
                            </li>
                            <li>
                                Удобная работа в личном кабинете: вы можете управлять файлами, сортировать,
                                комментировать и сохранять версии;
                            </li>
                        </ul>
                        <p className={`mt-[20px]`}>
                            Наши клиенты — от частных экспертов до корпоративных отделов продаж, медиа-агентств,
                            IT-компаний, вузов и госконтрактов.
                            Они доверяют нам свои данные, и мы ежедневно доказываем, что это доверие оправдано.
                        </p>

                        <p>
                            Начните с бесплатного теста: загрузите файл, получите текст, проверьте форматирование и
                            удобство интерфейса.
                            Убедитесь сами: юридическая прозрачность, технологическая точность и удобство
                        </p>
                        <div
                            className={`max-w-[600px] m-auto rounded-[6px] flex items-center justify-center mt-[30px]`}>
                            <img className={`w-full object-cover`} src="/policy/image3.png" alt="img1"/>
                        </div>
                    </section>
                </div>
            </div>
            <ImageModal
                isOpen={openFirst}
                slides={slidesFirst}
                onClose={closeModal}
            />

            <ImageModal
                isOpen={openSecond}
                slides={slidesSecond}
                onClose={closeModal}
            />
        </>
    );
}
