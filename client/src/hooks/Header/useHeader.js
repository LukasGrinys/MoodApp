import { useState, useCallback } from 'react';

export const useHeader = () => {
    const [ showNav, setShowNav ] = useState(false);

    const toggleNav = useCallback(() => {
        setShowNav(!showNav)
    }, [showNav]);

    return {
        showNav,
        toggleNav
    }
}