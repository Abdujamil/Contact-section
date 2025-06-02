"use client";
import { useEffect, useState } from "react";
import { useScrollContainer } from "@/components/ScrollBar/ScrollWrapper"; // Путь к вашему ScrollWrapper

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const scrollContainer = useScrollContainer();

  useEffect(() => {
    if (!scrollContainer) {
      console.warn("ScrollProgress: scroll container is not available");
      return;
    }

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;

      // Отладочная информация
      console.log("Scroll data:", {
        scrollTop,
        scrollHeight: scrollContainer.scrollHeight,
        clientHeight: scrollContainer.clientHeight,
        calculatedHeight: scrollHeight,
      });

      if (scrollHeight <= 0) {
        console.warn("ScrollHeight is 0 or negative:", scrollHeight);
        setScrollPercent(0);
        return;
      }

      const percent = scrollTop / scrollHeight;
      const clampedPercent = Math.min(1, Math.max(0, percent));

      console.log("Percent calculation:", { percent, clampedPercent });
      setScrollPercent(clampedPercent);

      // Показываем индикатор только если есть что скроллить
      setIsVisible(scrollHeight > 10);
    };

    // Добавляем задержку для первоначального расчета
    const timeoutId = setTimeout(handleScroll, 100);

    // Добавляем throttling для производительности
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener("scroll", throttledScroll, {
      passive: true,
    });

    return () => {
      clearTimeout(timeoutId);
      scrollContainer.removeEventListener("scroll", throttledScroll);
    };
  }, [scrollContainer]);

  const dashArray = 126;
  const dashOffset = dashArray - dashArray * scrollPercent;
  const isComplete = scrollPercent >= 1;

  // Для внутренней линии при завершении
  const innerDashArray = 100;
  const innerDashOffset = isComplete ? 0 : innerDashArray;

  // Не рендерим, если контейнер недоступен или нечего скроллить
  if (!scrollContainer || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Круговой прогресс */}
      <div className="fixed top-[70px] right-[30px] w-[100px] h-[100px] z-50">
        <svg className="absolute" width="100" height="100">
          <g>
            <circle
              cx="0"
              cy="0"
              r="20"
              className="fill-transparent stroke-[#0A74DA] stroke-[40] transition-all duration-100"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              transform="translate(50,50) rotate(-90)"
            />
          </g>

          {/* Дополнительная линия при завершении */}
          {isComplete && (
            <g>
              <circle
                cx="0"
                cy="0"
                r="16"
                className="fill-transparent stroke-[#10b981] stroke-2 transition-all duration-1000 ease-out"
                strokeDasharray={innerDashArray}
                strokeDashoffset={innerDashOffset}
                strokeLinecap="round"
                transform="translate(50,50) rotate(-90)"
              />
            </g>
          )}

          <g>
            <circle
              cx="0"
              cy="0"
              r="38"
              className="fill-transparent"
              transform="translate(50,50)"
            />
          </g>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full text-center leading-[100px] text-[#0082FF] font-medium text-[18px]">
          {Math.round(scrollPercent * 100)}%
        </div>
      </div>

      {/* Линейный прогресс */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#0A74DA] z-50"
        style={{ width: `${scrollPercent * 100}%` }}
      />
    </>
  );
}
