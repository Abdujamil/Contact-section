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
                                        className="font-normal md:text-[20px] text-[18px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc]">
                                      Свидетельство
                                    </span>

                                        <svg
                                            className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.53797 3.46154C1.53797 2.95151 1.74058 2.46236 2.10123 2.10172C2.46188 1.74107 2.95102 1.53846 3.46105 1.53846H4.6149V5C4.6149 5.25254 4.66464 5.50261 4.76128 5.73593C4.85793 5.96925 4.99958 6.18125 5.17815 6.35982C5.5388 6.72047 6.02794 6.92308 6.53797 6.92308H12.6918C12.9444 6.92308 13.1944 6.87334 13.4277 6.77669C13.6611 6.68005 13.8731 6.53839 14.0516 6.35982C14.2302 6.18125 14.3719 5.96925 14.4685 5.73593C14.5652 5.50261 14.6149 5.25254 14.6149 5V1.56923C14.9991 1.6396 15.3527 1.82527 15.6287 2.10154L17.898 4.37077C18.0765 4.54938 18.2182 4.76141 18.3148 4.99476C18.4114 5.22811 18.4611 5.47821 18.4611 5.73077V16.5385C18.4611 16.9818 18.3081 17.4115 18.0277 17.755C17.7474 18.0984 17.357 18.3344 16.9226 18.4231V11.9231C16.9226 11.413 16.72 10.9239 16.3593 10.5633C15.9987 10.2026 15.5095 10 14.9995 10H4.99951C4.48948 10 4.00034 10.2026 3.63969 10.5633C3.27904 10.9239 3.07643 11.413 3.07643 11.9231V18.4231C2.64206 18.3344 2.25167 18.0984 1.97132 17.755C1.69097 17.4115 1.53788 16.9818 1.53797 16.5385V3.46154ZM4.6149 18.4615V11.9231C4.6149 11.8211 4.65542 11.7232 4.72755 11.6511C4.79968 11.579 4.89751 11.5385 4.99951 11.5385H14.9995C15.1015 11.5385 15.1993 11.579 15.2715 11.6511C15.3436 11.7232 15.3841 11.8211 15.3841 11.9231V18.4615H4.6149ZM13.0764 1.53846V5C13.0764 5.10201 13.0359 5.19984 12.9638 5.27196C12.8917 5.34409 12.7938 5.38462 12.6918 5.38462H6.53797C6.43597 5.38462 6.33814 5.34409 6.26601 5.27196C6.19388 5.19984 6.15336 5.10201 6.15336 5V1.53846H13.0764ZM3.46105 1.29807e-10C2.54299 1.29808e-10 1.66254 0.364697 1.01337 1.01386C0.364208 1.66303 -0.000488281 2.54348 -0.000488281 3.46154V16.5385C-0.000488281 17.4565 0.364208 18.337 1.01337 18.9861C1.66254 19.6353 2.54299 20 3.46105 20H16.538C17.456 20 18.3365 19.6353 18.9857 18.9861C19.6348 18.337 19.9995 17.4565 19.9995 16.5385V5.73077C19.9995 5.27619 19.91 4.82607 19.736 4.40609C19.5621 3.98611 19.3071 3.60451 18.9857 3.28308L16.7164 1.01385C16.395 0.692413 16.0134 0.43744 15.5934 0.263484C15.1734 0.089528 14.7233 -3.93643e-06 14.2687 1.29807e-10H3.46105Z"
                                                fill="#CCCCCC"
                                            />
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
                                        className="font-normal md:text-[20px] text-[18px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc]">
                                      Выписка из реестра
                                    </span>

                                        <svg
                                            className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.53797 3.46154C1.53797 2.95151 1.74058 2.46236 2.10123 2.10172C2.46188 1.74107 2.95102 1.53846 3.46105 1.53846H4.6149V5C4.6149 5.25254 4.66464 5.50261 4.76128 5.73593C4.85793 5.96925 4.99958 6.18125 5.17815 6.35982C5.5388 6.72047 6.02794 6.92308 6.53797 6.92308H12.6918C12.9444 6.92308 13.1944 6.87334 13.4277 6.77669C13.6611 6.68005 13.8731 6.53839 14.0516 6.35982C14.2302 6.18125 14.3719 5.96925 14.4685 5.73593C14.5652 5.50261 14.6149 5.25254 14.6149 5V1.56923C14.9991 1.6396 15.3527 1.82527 15.6287 2.10154L17.898 4.37077C18.0765 4.54938 18.2182 4.76141 18.3148 4.99476C18.4114 5.22811 18.4611 5.47821 18.4611 5.73077V16.5385C18.4611 16.9818 18.3081 17.4115 18.0277 17.755C17.7474 18.0984 17.357 18.3344 16.9226 18.4231V11.9231C16.9226 11.413 16.72 10.9239 16.3593 10.5633C15.9987 10.2026 15.5095 10 14.9995 10H4.99951C4.48948 10 4.00034 10.2026 3.63969 10.5633C3.27904 10.9239 3.07643 11.413 3.07643 11.9231V18.4231C2.64206 18.3344 2.25167 18.0984 1.97132 17.755C1.69097 17.4115 1.53788 16.9818 1.53797 16.5385V3.46154ZM4.6149 18.4615V11.9231C4.6149 11.8211 4.65542 11.7232 4.72755 11.6511C4.79968 11.579 4.89751 11.5385 4.99951 11.5385H14.9995C15.1015 11.5385 15.1993 11.579 15.2715 11.6511C15.3436 11.7232 15.3841 11.8211 15.3841 11.9231V18.4615H4.6149ZM13.0764 1.53846V5C13.0764 5.10201 13.0359 5.19984 12.9638 5.27196C12.8917 5.34409 12.7938 5.38462 12.6918 5.38462H6.53797C6.43597 5.38462 6.33814 5.34409 6.26601 5.27196C6.19388 5.19984 6.15336 5.10201 6.15336 5V1.53846H13.0764ZM3.46105 1.29807e-10C2.54299 1.29808e-10 1.66254 0.364697 1.01337 1.01386C0.364208 1.66303 -0.000488281 2.54348 -0.000488281 3.46154V16.5385C-0.000488281 17.4565 0.364208 18.337 1.01337 18.9861C1.66254 19.6353 2.54299 20 3.46105 20H16.538C17.456 20 18.3365 19.6353 18.9857 18.9861C19.6348 18.337 19.9995 17.4565 19.9995 16.5385V5.73077C19.9995 5.27619 19.91 4.82607 19.736 4.40609C19.5621 3.98611 19.3071 3.60451 18.9857 3.28308L16.7164 1.01385C16.395 0.692413 16.0134 0.43744 15.5934 0.263484C15.1734 0.089528 14.7233 -3.93643e-06 14.2687 1.29807e-10H3.46105Z"
                                                fill="#CCCCCC"
                                            />
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
                            className={`max-w-[600px] m-auto rounded-[8px] flex items-center justify-center mt-[30px]`}>
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
