import { useState, useEffect } from 'react';

// export const useOperatingSystem = () => {
//     const [isMac, setIsMac] = useState(false);
//     const [isWindows, setIsWindows] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() => {
//         const userAgent = navigator.userAgent;
//         setIsMac(userAgent.includes('Mac OS X'));
//         setIsWindows(userAgent.includes('Windows'));
//         setIsLoading(false);
//     }, []);
//
//     return { isMac, isWindows, isLoading };
// };

// Более короткий вариант, если нужен только Mac:
export const useIsMac = () => {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.userAgent.includes('Mac OS X'));
    }, []);

    return isMac;
};