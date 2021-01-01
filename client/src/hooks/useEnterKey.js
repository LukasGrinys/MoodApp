import { useEffect } from 'react';

export const useEnterKey = action => {
    const handler = event => {
        if (event.keyCode === 13) {
            action();
        }
    }

    useEffect( () => {
        window.addEventListener('keydown', handler);

        return () => {
            window.removeEventListener('keydown', handler)
        }
    });
}