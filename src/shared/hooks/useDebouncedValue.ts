import { useEffect, useRef, useState } from 'react';

export const useDebouncedValue = <T>(dependency: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(dependency);
    const isMounted = useRef(false);
    const timeoutRef = useRef<number | null>(null);

    const cancel = () => window.clearTimeout(timeoutRef.current!);

    useEffect(() => {
        isMounted.current = true;
        return cancel;
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            timeoutRef.current = window.setTimeout(() => {
                setDebouncedValue(dependency);
            }, delay);
        }

        return cancel;
    }, [dependency]);

    return [debouncedValue, cancel] as const;
};
