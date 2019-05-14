import React, {Component} from 'react';
import './App.css';
import history from './history';
import {Admin, Resource} from 'react-admin';
import dataProvider from './DataProvider';
import './App.css';
import {CustomerList} from "./CustomerComponents/CustomerList";
import {ProductList} from "./ProductComponents/ProductList";

class App extends Component {
    render() {
        return (
            <Admin
                title="Store"
                dataProvider={dataProvider("http://localhost:9000")}
                history={history}>
                <Resource
                    name="customers"
                    options={{label: "Clientes"}}
                    list={CustomerList}
                />
                <Resource
                    name="products"
                    options={{label: "Produtos"}}
                    list={ProductList}
                />
            </Admin>
        );
    }
}

export default App;