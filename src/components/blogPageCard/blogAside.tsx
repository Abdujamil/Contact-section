// "use client";
// import {useScrollSpy} from "../useScrollSpy";
// import React, {useState, useEffect} from "react";
// import styles from "@/app/page.module.scss";
// import HeaderStyles from "../header/Header.module.css";
// import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
// // import GlassSurface from "@/components/header/MenuGlass";
//
// type AsideItem = {
//     id: string;
//     title: string;
//     subtitle?: string[];
// };
//
// type BlogAsideProps = {
//     items: AsideItem[];
//     variant?: 'default' | 'editors'; // Добавляем проп для варианта отображения
// };
//
// export default function BlogAside({items, variant = 'default'}: BlogAsideProps) {
//     const [clickedHash, setClickedHash] = useState<string | null>(null);
//     const [lastActiveHash, setLastActiveHash] = useState<string>("");
//
//     const sectionIds = items.map((item) => item.id);
//     const scrollSpyHash = useScrollSpy({sectionIds, offset: 100});
//
//     useEffect(() => {
//         if (clickedHash && scrollSpyHash === clickedHash) {
//             setClickedHash(null);
//         }
//     }, [clickedHash, scrollSpyHash]);
//
//     useEffect(() => {
//         if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
//             setLastActiveHash(scrollSpyHash);
//         }
//     }, [scrollSpyHash, lastActiveHash]);
//
//     const activeHash = clickedHash || lastActiveHash;
//
//     const handleAnchorClick = (
//         href: string,
//         index: number,
//         e: React.MouseEvent
//     ) => {
//         e.preventDefault();
//
//         const targetElement = document.querySelector(href);
//         if (targetElement) {
//             const offset = 100;
//             const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
//
//             window.scrollTo({
//                 top: targetPosition,
//                 behavior: "smooth",
//             });
//
//             setClickedHash(href);
//         }
//     };
//
//     // Определяем классы для разных вариантов
//     const containerClasses = variant === 'editors'
//         ? "grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-[10px] md:gap-0"
//         : "space-y-[10px]";
//
//     // Функция для получения классов элемента
//     const getItemClasses = (href: string) => {
//         const baseClasses = `relative font-[Rubik] !font-light text-[#adadad] !leading-[130%] text-balance
//            group
//            ${styles["blogAsideBtn"]}
//            ${HeaderStyles["login-button"]}
//            ${styles["faqTryBtn"]}
//            w-full !h-full flex !justify-start items-center ease-in duration-150 !rounded-[6px]
//            ${
//             activeHash === href
//                 ? `${styles.blogAsideBtnActive} !border-[#adadad]`
//                 : "!border-transparent hover:!border-[#353535] group-hover:!text-[#ccc]"
//         }
//            active:will-change-transform`;
//
//         if (variant === 'editors') {
//             return `${baseClasses} !text-[14px] md:!text-[16px] !justify-center md:!justify-start !text-center md:!text-left
//                 text-[14px] md:text-[16px] !p-[8px] md:!p-[12px] min-h-[48px] md:min-h-auto`;
//         } else {
//             return `${baseClasses} !text-[16px] !justify-start !text-left text-[16px] !p-[12px]`;
//         }
//     };
//
//     return (
//         <ul className={containerClasses}>
//             {items.map((item, index) => {
//                 const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
//                 const href = baseId;
//
//                 return (
//                     <li key={baseId}>
//                         {/*<GlassSurface*/}
//                         {/*    width={260}*/}
//                         {/*    height={70}*/}
//                         {/*>*/}
//                             <a
//                                 href={href}
//                                 onClick={(e) => handleAnchorClick(href, index, e)}
//                                 className={getItemClasses(href)}
//                                 onMouseMove={handleMouseMove}
//                                 onMouseLeave={handleMouseLeave}
//                             >
//                                 {item.title}
//                             </a>
//
//                         {/*</GlassSurface>*/}
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// }

"use client";
import {useScrollSpy} from "../useScrollSpy";
import React, {useState, useEffect} from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "../header/Header.module.css";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import GlassSurface from "@/components/header/MenuGlass";

type AsideItem = {
    id: string;
    title: string;
    subtitle?: string[];
};

type BlogAsideProps = {
    items: AsideItem[];
    variant?: 'default' | 'editors';
};

// Интерфейс для настроек стекла
interface GlassSettings {
    borderRadius: number;
    backgroundOpacity: number;
    saturation: number;
    borderWidth: number;
    brightness: number;
    opacity: number;
    blur: number;
    displace: number;
    distortionScale: number;
    redOffset: number;
    greenOffset: number;
    blueOffset: number;
}

// Пропсы для компонента настроек
interface GlassSettingsProps {
    isOpen: boolean;
    onToggle: () => void;
    onSettingsChange: (settings: GlassSettings) => void;
}

// Компонент настроек GlassSurface
const GlassSettingsComponent = ({isOpen, onToggle, onSettingsChange}: GlassSettingsProps) => {
    const [settings, setSettings] = useState<GlassSettings>({
        borderRadius: 6,
        backgroundOpacity: 0.07,
        saturation: 1,
        borderWidth: 0.07,
        brightness: 50,
        opacity: 0.93,
        blur: 11,
        displace: 0,
        distortionScale: -180,
        redOffset: 0,
        greenOffset: 10,
        blueOffset: 20,
    });

    const updateSetting = (key: keyof GlassSettings, value: number) => {
        const newSettings = {...settings, [key]: value};
        setSettings(newSettings);
        onSettingsChange(newSettings);
    };

    interface SliderProps {
        label: string;
        value: number;
        onChange: (value: number) => void;
        min: number;
        max: number;
        step?: number;
        unit?: string;
    }

    const Slider = ({label, value, onChange, min, max, step = 1, unit = ""}: SliderProps) => (
        <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                    {value}{unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                onInput={(e) => onChange(parseFloat((e.target as HTMLInputElement).value))} // Добавляем onInput для плавного перетаскивания
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-black-700"
                style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
                }}
            />
        </div>
    );

    if (!isOpen) return null;

    return (
        <div
            className="absolute -top-[90%] right-[-350%] w-80 bg-black dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 z-50 max-h-96 overflow-y-auto allow-native-scroll">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    GlassSurface Settings
                </h3>
                <button
                    onClick={onToggle}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-2">
                <Slider
                    label="Border Radius"
                    value={settings.borderRadius}
                    onChange={(value) => updateSetting('borderRadius', value)}
                    min={0}
                    max={50}
                    unit="px"
                />
                <Slider
                    label="Background Opacity"
                    value={settings.backgroundOpacity}
                    onChange={(value) => updateSetting('backgroundOpacity', value)}
                    min={0}
                    max={1}
                    step={0.01}
                />
                <Slider
                    label="Saturation"
                    value={settings.saturation}
                    onChange={(value) => updateSetting('saturation', value)}
                    min={0}
                    max={3}
                    step={0.1}
                />
                <Slider
                    label="Border Width"
                    value={settings.borderWidth}
                    onChange={(value) => updateSetting('borderWidth', value)}
                    min={0}
                    max={5}
                    step={0.01}
                />
                <Slider
                    label="Brightness"
                    value={settings.brightness}
                    onChange={(value) => updateSetting('brightness', value)}
                    min={0}
                    max={200}
                    unit="%"
                />
                <Slider
                    label="Opacity"
                    value={settings.opacity}
                    onChange={(value) => updateSetting('opacity', value)}
                    min={0}
                    max={1}
                    step={0.01}
                />
                <Slider
                    label="Blur"
                    value={settings.blur}
                    onChange={(value) => updateSetting('blur', value)}
                    min={0}
                    max={50}
                    unit="px"
                />
                <Slider
                    label="Displace"
                    value={settings.displace}
                    onChange={(value) => updateSetting('displace', value)}
                    min={0}
                    max={20}
                    step={0.1}
                />
                <Slider
                    label="Distortion Scale"
                    value={settings.distortionScale}
                    onChange={(value) => updateSetting('distortionScale', value)}
                    min={-500}
                    max={500}
                    step={10}
                />
                <Slider
                    label="Red Offset"
                    value={settings.redOffset}
                    onChange={(value) => updateSetting('redOffset', value)}
                    min={-50}
                    max={50}
                />
                <Slider
                    label="Green Offset"
                    value={settings.greenOffset}
                    onChange={(value) => updateSetting('greenOffset', value)}
                    min={-50}
                    max={50}
                />
                <Slider
                    label="Blue Offset"
                    value={settings.blueOffset}
                    onChange={(value) => updateSetting('blueOffset', value)}
                    min={-50}
                    max={50}
                />
            </div>
        </div>
    );
};

export default function BlogAside({items, variant = 'default'}: BlogAsideProps) {
    const [clickedHash, setClickedHash] = useState<string | null>(null);
    const [lastActiveHash, setLastActiveHash] = useState<string>("");
    const [showSettings, setShowSettings] = useState(false);
    const [glassSettings, setGlassSettings] = useState<GlassSettings>({
        borderRadius: 6,
        backgroundOpacity: 0.07,
        saturation: 1,
        borderWidth: 0.07,
        brightness: 50,
        opacity: 0.93,
        blur: 11,
        displace: 0,
        distortionScale: -180,
        redOffset: 0,
        greenOffset: 10,
        blueOffset: 20,
    });

    const sectionIds = items.map((item) => item.id);
    const scrollSpyHash = useScrollSpy({sectionIds, offset: 100});

    useEffect(() => {
        if (clickedHash && scrollSpyHash === clickedHash) {
            setClickedHash(null);
        }
    }, [clickedHash, scrollSpyHash]);

    useEffect(() => {
        if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
            setLastActiveHash(scrollSpyHash);
        }
    }, [scrollSpyHash, lastActiveHash]);

    const activeHash = clickedHash || lastActiveHash;

    const handleAnchorClick = (
        href: string,
        index: number,
        e: React.MouseEvent
    ) => {
        e.preventDefault();

        const targetElement = document.querySelector(href);
        if (targetElement) {
            const offset = 100;
            const targetPosition = (targetElement as HTMLElement).offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            setClickedHash(href);
        }
    };

    // Определяем классы для разных вариантов
    const containerClasses = variant === 'editors'
        ? "grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-[10px] md:gap-0"
        : "space-y-[10px]";

    // Функция для получения классов элемента
    const getItemClasses = (href: string, isActive: boolean) => {
        const baseClasses = `relative font-[Rubik] !font-light text-[#adadad] !leading-[130%] text-balance
           group
           ${!isActive ? styles["blogAsideBtn"] : ''}
           ${!isActive ? HeaderStyles["login-button"] : ''}
           ${!isActive ? styles["faqTryBtn"] : ''}
           w-full !h-full flex items-center ease-in duration-150 !rounded-[6px]
           ${
            !isActive
                ? "!border-transparent hover:!border-[#353535] group-hover:!text-[#ccc]"
                : "!border-transparent !text-[#fff]"
        }
           active:will-change-transform`;

        if (variant === 'editors') {
            return `${baseClasses} !text-[14px] md:!text-[16px] !justify-center md:!justify-start !text-center md:!text-left
                text-[14px] md:text-[16px] !p-[8px] md:!p-[12px] min-h-[48px] md:min-h-auto`;
        } else {
            return `${baseClasses} !text-[16px] !justify-start !text-left text-[16px] !p-[12px]`;
        }
    };

    // Функция для определения размеров GlassSurface в зависимости от варианта
    const getGlassSurfaceProps = () => {
        if (variant === 'editors') {
            return {
                width: "100%",
                height: 48,
                ...glassSettings
            };
        } else {
            return {
                width: "100%",
                height: "auto",
                ...glassSettings
            };
        }
    };

    return (
        <div className="relative">
            {/* Кнопка настроек */}
            <button
                onClick={() => setShowSettings(!showSettings)}
                className="absolute -top-[100%] right-[-350%] text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors z-40"
            >
                ⚙️ Settings
            </button>

            {/* Панель настроек */}
            <GlassSettingsComponent
                isOpen={showSettings}
                onToggle={() => setShowSettings(!showSettings)}
                onSettingsChange={setGlassSettings}
            />

            <ul className={containerClasses}>
                {items.map((item, index) => {
                    const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
                    const href = baseId;
                    const isActive = activeHash === href;

                    return (
                        <li key={baseId}>
                            {isActive ? (
                                <GlassSurface
                                    {...getGlassSurfaceProps()}
                                    className="transition-all duration-150 ease-in"
                                >
                                    <a
                                        href={href}
                                        onClick={(e) => handleAnchorClick(href, index, e)}
                                        className={getItemClasses(href, isActive)}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item.title}
                                    </a>
                                </GlassSurface>
                            ) : (
                                <a
                                    href={href}
                                    onClick={(e) => handleAnchorClick(href, index, e)}
                                    className={getItemClasses(href, isActive)}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.title}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
