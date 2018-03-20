import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
    }

    render() {

        const columns = [
            {
                id:'sku',
                Header: 'SKU',
                accesspr: 'sku'
            },
            {
                Header: 'Name',
                accesspr: 'name'
            },
            {
                id: 'price',
                Header: 'Price',
                accesspr: 'salePrice'
            }
        ];
        return (
            //<div>{JSON.stringify(this.state.response, null, 2) }</div>
            <ReactTable data={ this.state.response.products } columns={ columns } />
        );
    }
}

export default LaptopList;