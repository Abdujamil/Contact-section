"use client";

import { useEffect, useState } from "react";

export default function BrowserProvider() {
    const [browserDetected, setBrowserDetected] = useState(false);

    useEffect(() => {
        // Проверяем, не был ли браузер уже определен внешним скриптом
        const hasExistingClass = document.documentElement.className
            .split(' ')
            .some(cls => cls.startsWith('is-'));

        if (hasExistingClass) {
            setBrowserDetected(true);
            return;
        }

        // Если внешний скрипт не сработал, определяем браузер здесь
        const browserClasses = [
            'is-yandex', 'is-edge', 'is-opera',
            'is-firefox', 'is-arc', 'is-chromium',
            'is-chrome', 'is-safari', 'is-unknown'
        ];

        document.documentElement.classList.remove(...browserClasses);

        const ua = navigator.userAgent.toLowerCase();

        let detectedBrowser = 'is-unknown';

        if (ua.includes("yabrowser")) {
            detectedBrowser = "is-yandex";
        } else if (ua.includes("edg/") || ua.includes("edge/")) {
            detectedBrowser = "is-edge";
        } else if (ua.includes("opr/") || ua.includes("opera/")) {
            detectedBrowser = "is-opera";
        } else if (ua.includes("firefox/")) {
            detectedBrowser = "is-firefox";
        } else if (ua.includes("arc/")) {
            detectedBrowser = "is-arc";
        } else if (ua.includes("chromium/")) {
            detectedBrowser = "is-chromium";
        } else if (ua.includes("chrome/") || ua.includes("crios/")) {
            detectedBrowser = "is-chrome";
        } else if (ua.includes("safari/") && !ua.includes("chrome/")) {
            detectedBrowser = "is-safari";
        }

        document.documentElement.classList.add(detectedBrowser);
        setBrowserDetected(true);

        // Диспатчим событие для других компонентов
        window.dispatchEvent(new CustomEvent('browserDetected', {
            detail: { browser: detectedBrowser }
        }));

        // Логирование для отладки (только в development)
        if (process.env.NODE_ENV === 'development') {
            console.log("Browser detected by fallback:", detectedBrowser);
        }
    }, []);

    // Слушаем событие от внешнего скрипта
    useEffect(() => {
        const handleBrowserDetected = () => {
            setBrowserDetected(true);
        };

        window.addEventListener('browserDetected', handleBrowserDetected);
        return () => window.removeEventListener('browserDetected', handleBrowserDetected);
    }, []);

    return null;
}