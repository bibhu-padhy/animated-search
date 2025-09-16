import { useEffect, useState } from "react";

export const useCountUp = (end: number, duration: number = 500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (end === 0) {
            setCount(0);
            return;
        }

        setCount(0);

        const startTime = Date.now();

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(progress * end);

            if (progress >= 1) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration]);

    return count;
};