import React from 'react';
import {
    Edit,
    required,
    SimpleForm,
    TextInput,
    NumberInput
} from 'react-admin';

import {CustomToolbar} from '../UtilComponents/CustomToolbar';
import {CustomActions} from "../UtilComponents/CustomActions";

export const OrderStoreEdit = ({...props}) => (
    <Edit title="Editar compra" actions={<CustomActions/>} {...props}>
        <SimpleForm toolbar={<CustomToolbar/>}>
            <TextInput source="name" label="Nome" validate={required()}/>
            <NumberInput source="price" label="Preço" validate={required()}/>
        </SimpleForm>
    </Edit>
);