import React, { Component } from 'react';
import styles from './css/header.module.css';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import NavBar from './navBar';

class Header extends Component {
    state = {
        openNav : false
    }
    returnStyle = (nightmode) => {
        if (nightmode === "true") {
            return { backgroundColor: "#2F2F2F"}
        } 
        return null
    }
    showNav = () => {
        if (this.state.openNav) {
            this.setState({
                openNav : false
            })
        } else {
            this.setState({
                openNav: true
            })
        }
    }
    closeNav = () => {
        if (this.state.openNav) {
            this.setState({
                openNav: false
            })
        }
    }
    makeInvisible = () => (
        this.props.user.data ?
        {opacity : "1"} :
        {opacity : "0"}
    )
    returnButton = () => (
        this.state.openNav ?
            <FontAwesome
            name="close"
            onClick={this.showNav}
            style={{
                    fontSize: '1.5em',
                    padding: "2px",
                    color: "#f2f2f2",
                    transform: "rotate(90deg)",
                    transition: "0.5s"
            }}/>
         :
            <FontAwesome
            name="bars"
            onClick={this.showNav}
            style={
                {
                    fontSize: '1.5em',
                    padding: "2px",
                    color: "#f2f2f2",
                    transform: "rotate(180deg)",
                    transition: "0.5s"
            }}/>
    )

    showItems = () => (
        this.state.openNav ?
        <NavBar closeNav={this.closeNav} isAuth={this.props.user.data.isAuth} nightmode={this.props.nightmode}/>
        : null
    )

    render() {
        return (
            <div className={styles.header}>
                <div className={styles.top} style={this.returnStyle(this.props.nightmode)}>
                    <div className={styles.logo}>MoodApp</div>
                    <div className={styles.bars} style={this.makeInvisible()}>
                        {this.returnButton()}
                    </div>
                </div>
                {this.showItems()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Header);