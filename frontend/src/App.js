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
import {CustomerShow} from "./CustomerComponents/CustomerShow";
import {OrderStoreShow} from "./OrderComponents/OrderStoreShow";
import {ProductShow} from "./ProductComponents/ProductShow";
import OrderIcon from '@material-ui/icons/ShoppingCart';
import CustomerIcon from '@material-ui/icons/Person';
import {ProductEdit} from "./ProductComponents/ProductEdit";
import {OrderStoreEdit} from "./OrderComponents/OrderStoreEdit";
import {CustomerEdit} from "./CustomerComponents/CustomerEdit";
import {CONFIG} from "./Config";

class App extends Component {
    render() {
        return (
            <Admin
                title="Store"
                dataProvider={dataProvider(CONFIG.API_URL)}
                history={history}>
                <Resource
                    name="customers"
                    options={{label: "Clientes"}}
                    icon={CustomerIcon}
                    list={CustomerList}
                    create={CustomerCreate}
                    show={CustomerShow}
                    edit={CustomerEdit}
                />
                <Resource
                    name="orders"
                    options={{label: "Compras"}}
                    icon={OrderIcon}
                    list={OrderStoreList}
                    create={OrderStoreCreate}
                    show={OrderStoreShow}
                    edit={OrderStoreEdit}
                />
                <Resource
                    name="products"
                    options={{label: "Produtos"}}
                    list={ProductList}
                    create={ProductCreate}
                    show={ProductShow}
                    edit={ProductEdit}
                />
            </Admin>
        );
    }
}

export default App;