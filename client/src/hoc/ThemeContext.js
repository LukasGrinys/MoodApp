import React, { useContext, useState, useEffect } from 'react';

// Creating contexts
const ThemeContext = React.createContext();
const UpdateThemeContext = React.createContext();

// Custom hooks
export function useTheme() {
    return useContext(ThemeContext);
};

export function useThemeUpdate() {
    return useContext(UpdateThemeContext);
};

export function ThemeProvider ({children}) {
    const retrieveData = () => {
        let nightmode = localStorage.getItem('nightmode');
        if (nightmode !== undefined) {
            if (nightmode === 'true') {
                return true
            } else {
                return false
            }
        } else {
            return false;
        }
    }

    const [ darkTheme, updateTheme ] = useState(retrieveData());

    useEffect( () => {
        if (darkTheme === true) {
            document.body.style.background = "rgb(51, 51, 51)";
            document.body.style.color = "rgb(242,242,242";
        } else {
            document.body.style.background = "#FFFFFF";
            document.body.style.color = "#000000";
        }
    }, [darkTheme]);

    const toggleTheme = () => {
        updateTheme( (prevTheme) => { 
            localStorage.setItem('nightmode', !prevTheme);
            return !prevTheme 
        });
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <UpdateThemeContext.Provider value={toggleTheme}>
                {children}
            </UpdateThemeContext.Provider>
        </ThemeContext.Provider>
    )
}
