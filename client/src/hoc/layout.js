import React from 'react';
import Header from './header';

const returnBackgroundStyle = (nm) => {
    if (nm === true) {
        document.body.style.background = "rgb(51, 51, 51)";
        document.body.style.color = "rgb(242,242,242";
    }
}
const Layout = (props) => {
    returnBackgroundStyle(props.nightmode);
    return (
        <div>
            <Header {...props}/>
            <div className="content_wrapper" {...props}>
                    {props.children}
            </div>
        </div>
    );
}

export default Layout;