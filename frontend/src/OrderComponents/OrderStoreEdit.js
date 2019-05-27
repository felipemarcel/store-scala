import React from 'react';
import {
    Edit,
    SimpleForm,
    FunctionField
} from 'react-admin';

import {CustomToolbar} from '../UtilComponents/CustomToolbar';
import {CustomActions} from "../UtilComponents/CustomActions";
import OrderReferenceField from "./OrderReferenceField";

export const OrderStoreEdit = ({...props}) => (
    <Edit title="Editar compra" actions={<CustomActions/>} {...props}>
        <SimpleForm toolbar={<CustomToolbar/>}>
            <FunctionField sortable={false} label="Estado"
                           render={record => record.status ? "Pago" : "Em aberto"}/>
            <OrderReferenceField references="orders"/>
        </SimpleForm>
    </Edit>
);