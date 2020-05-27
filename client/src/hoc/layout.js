import React, { Component } from 'react';
import Header from './header';

class Layout extends Component {
    render() {
        let nightmode = this.props.nightmode;
        return (
            <div>
                <Header nightmode={nightmode} changemode={this.props.changemode}/>
                <div className="content_wrapper" nightmode={this.props.nightmode}>
                        {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;