import React, { Component } from 'react';

import Search from './Search';

class Navigation extends Component {

    render() {
        return (
            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
                <Search />
            </nav>
        );
    }

}

export default Navigation;