import { useEffect, useState } from 'react';

/**
 * @name useCheckMounted
 * @description Custom hook to check if a component has mounted
 * 
 * This custom hook is mainly used to avoid hydration mismatch
 * when rendering dynamic styles
 * 
 * @returns {boolean} true or false if component has mounted
 * 
 * @example
 * const isMounted = useCheckMounted();
 * 
 * useEffect(() => {
 *  if (isMounted) {
 *      // perform logic specific to mount state
 *  }
 * }, [isMounted]);
 * 
 */

export const useCheckMounted = (): boolean => {
    const [componentMounted, setComponentMounted] = useState<boolean>(false);

    useEffect(() => {
        setComponentMounted(true);
        return () => {
            setComponentMounted(false);
        };
    }, []);

    return componentMounted;
};
