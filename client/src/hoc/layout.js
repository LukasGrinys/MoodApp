import React, { Component } from 'react';
import Header from './header';
import { ThemeProvider } from './ThemeContext';

class Layout extends Component {
    render() {
        return (
            <ThemeProvider>
                <Header/>
                <div className="content_wrapper">
                        {this.props.children}
                </div>
            </ThemeProvider>
        );
    }
}

export default Layout;