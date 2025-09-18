import { useState, useEffect } from 'react';

interface RefreshRateResult {
    refreshRate: number;
    isDetecting: boolean;
    smoothScrollFactor: number;
}

export function useRefreshRate(): RefreshRateResult {
    const [refreshRate, setRefreshRate] = useState<number>(60); // default
    const [isDetecting, setIsDetecting] = useState<boolean>(true);

    useEffect(() => {
        let frameCount = 0;
        let startTime = 0;
        let animationId: number;
        const framesToMeasure = 60; // Измеряем 60 кадров для точности

        const measureFrameRate = (timestamp: number) => {
            if (startTime === 0) {
                startTime = timestamp;
            }

            frameCount++;

            if (frameCount < framesToMeasure) {
                animationId = requestAnimationFrame(measureFrameRate);
            } else {
                const elapsed = timestamp - startTime;
                const calculatedFPS = Math.round((frameCount * 1000) / elapsed);

                // Округляем до стандартных значений refresh rate
                let detectedRate = calculatedFPS;
                if (calculatedFPS >= 58 && calculatedFPS <= 62) detectedRate = 60;
                else if (calculatedFPS >= 70 && calculatedFPS <= 76) detectedRate = 75;
                else if (calculatedFPS >= 88 && calculatedFPS <= 92) detectedRate = 90;
                else if (calculatedFPS >= 118 && calculatedFPS <= 122) detectedRate = 120;
                else if (calculatedFPS >= 143 && calculatedFPS <= 147) detectedRate = 144;
                else if (calculatedFPS >= 163 && calculatedFPS <= 167) detectedRate = 165;
                else if (calculatedFPS >= 238 && calculatedFPS <= 242) detectedRate = 240;
                else if (calculatedFPS >= 358 && calculatedFPS <= 362) detectedRate = 360;

                setRefreshRate(detectedRate);
                setIsDetecting(false);

                console.log(`Detected refresh rate: ${detectedRate}Hz (measured: ${calculatedFPS}fps)`);
            }
        };

        // Начинаем измерение через небольшую задержку
        const timeout = setTimeout(() => {
            animationId = requestAnimationFrame(measureFrameRate);
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    // Вычисляем фактор плавности на основе частоты обновления
    const getSmoothScrollFactor = (rate: number): number => {
        if (rate <= 129) return 0.20;
        if (rate <= 199) return 0.15;
        return 0.10;
    };

    const smoothScrollFactor = getSmoothScrollFactor(refreshRate);

    return {
        refreshRate,
        isDetecting,
        smoothScrollFactor
    };
}