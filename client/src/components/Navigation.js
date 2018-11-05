import React, { Component } from 'react';

import logo from '../assets/logo.svg';

import './Navigation.css';

import Search from './Search';

class Navigation extends Component {

    render() {
        return (
            <nav className="navbar navbar-light shadow">
                <div className="container">
                <a className="col-sm-4 col-md-3 mr-0 p-0" href="#"><img className="navbar-brand" src={logo} alt="LaptopNabber" /></a>
                <Search />
                <div className="col-md-3">
                    Nav links
                </div>
                </div>
            </nav>
        );
    }

}

export default Navigation;