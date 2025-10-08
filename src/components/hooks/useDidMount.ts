import { useEffect, useRef } from 'react';

export const useDidMount = (
    callback: (isInitialMount: boolean) => void,
    dependencies: any[]) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            callback(false);
        } else {
            didMount.current = true;
            callback(true);
        }
    }, dependencies);
};