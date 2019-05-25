import React, {Component} from 'react';
import './App.css';
import history from './history';
import {Admin, Resource} from 'react-admin';
import dataProvider from './DataProvider';
import './App.css';
import {CustomerList} from "./CustomerComponents/CustomerList";
import {ProductList} from "./ProductComponents/ProductList";
import {OrderStoreList} from "./OrderComponents/OrderStoreList";
import {CustomerCreate} from "./CustomerComponents/CustomerCreate";
import {ProductCreate} from "./ProductComponents/ProductCreate";
import {OrderStoreCreate} from "./OrderComponents/OrderStoreCreate";

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
                    create={CustomerCreate}
                />
                <Resource
                    name="orders"
                    options={{label: "Compras"}}
                    list={OrderStoreList}
                    create={OrderStoreCreate}
                />
                <Resource
                    name="products"
                    options={{label: "Produtos"}}
                    list={ProductList}
                    create={ProductCreate}
                />
            </Admin>
        );
    }
}

export default App;