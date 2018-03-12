import React, { Component } from 'react';

class LaptopList extends Component {
    state = {
        response: ''
    };

    componentDidMount() {
        this.callBestBuyLaptopApi()
        .then(res => this.setState({ response: res }))
        .catch(err => console.log(err));
    }

    callBestBuyLaptopApi = async () => {
        const response = await fetch('/api/bestbuy');
        const body = await response.json();
    
        if (response.status != 200) throw Error(body.message);
    
        return body;
    }

    render() {
        return (
            <div>{JSON.stringify(this.state.response, null, 2) }</div>
        );
    }
}

export default LaptopList;