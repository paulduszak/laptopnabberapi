import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class LaptopList extends Component {
    state = {
        data: [],
        page: 0,
        pages: -1,
        pageSize: 10,
        loading: false
    };

    render() {

        const columns = [
            {
                Header: 'SKU',
                accessor: 'sku'
            },
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Price',
                accessor: 'salePrice'
            }
        ];
        
        return (
            <ReactTable
                manual
                data={ this.state.data }
                pages={ this.state.pages }
                pageSize={ this.state.pageSize }
                loading={this.state.loading }
                columns={ columns } 
                onFetchData={ (state, instance) => {
                    this.setState({loading:true});
                    axios.get('/api/bestbuy')
                    .then((res) => {
                        this.setState({
                            data: res.data.products,
                            page: res.data.nextCursorMark,
                            pages: res.data.totalPages,
                            loading: false
                        })
                    });
                }}
            />
        );
    }
}

export default LaptopList;