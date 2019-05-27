import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ArrayField,
    Datagrid,
    FunctionField
} from 'react-admin';

const OrderTotalFunction = (record) => (
    <span>
        {
            record.products
                .map(product => product.quantity)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        } Unidades
    </span>
);

const OrderTotalProductsFunction = (record) => (
    <span> R$
        {
            record.products
                .map(order => order.quantity * order.product.price)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
    </span>
);

export const OrderStoreShow = ({...props}) => (
    <Show title="Informações da compra" {...props}>
        <SimpleShowLayout>
            <FunctionField label="Estado"
                           render={record => record.status ? "Pago" : "Em aberto"}/>
            <FunctionField label="Total de unidades" render={OrderTotalFunction}/>
            <FunctionField label="Total da compra" render={OrderTotalProductsFunction}/>
            <ArrayField source="products" sortable={false} label="Produtos">
                <Datagrid>
                    <TextField source="quantity" sortable={false} label="Quantidade"/>
                    <TextField source="product.name" sortable={false} label="Nome"/>
                    <TextField source="product.price" sortable={false} label="Preço unitário"/>
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);