import { faHome, faSignInAlt, faSignOutAlt, faUserPlus, faCog, faBook } from '@fortawesome/free-solid-svg-icons';

export const items = [
    {
        iconName: faHome,
        path: "/",
        text: "Home",
        isAuth: null
    },
    {
        iconName: faSignInAlt,
        path: "/login",
        text: "Log In",
        isAuth: false
    },
    {
        iconName: faSignOutAlt,
        path: "/logout",
        text: "Log Out",
        isAuth: true
    },
    {
        iconName: faUserPlus,
        path: "/register",
        text: "Sign Up",
        isAuth: null
    },
    {
        iconName: faBook,
        path: "/dashboard",
        text: "Your Dashboard",
        isAuth: true
    },
    {
        iconName: faCog,
        path: "/settings",
        text: "Settings",
        isAuth: true
    }
];