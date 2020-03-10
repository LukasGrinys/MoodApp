import React, { Component } from 'react';
import Header from './header';

class Layout extends Component {
    render() {
        let nightmode = this.props.nightmode;
        return (
            <div>
                <Header nightmode={nightmode}/>
                <div className="content_wrapper" {...this.props}>
                        {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;