import React, { Component } from 'react';

class Search extends Component {

    render = () => {
        return ( 
            <input className="form-control form-control-dark col-md-6 float-left" type="text" placeholder="Have something specific in mind? Search here..." aria-label="Search" />
        );
    }

}

export default Search;