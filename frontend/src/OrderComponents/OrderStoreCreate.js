import React from 'react';
import {
    Create,
    SimpleForm
} from 'react-admin';
import OrderReferenceField from "./OrderReferenceField";

const defaultValue = {products: [], status: true};

export const OrderStoreCreate = ({...props}) => (
    <Create title="Nova compra" {...props}>
        <SimpleForm defaultValue={defaultValue}>
            <OrderReferenceField references="products" {...props}/>
        </SimpleForm>
    </Create>
);