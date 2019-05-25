import React from 'react';
import {
    Edit,
    required,
    SimpleForm,
    TextInput,
    NumberInput
} from 'react-admin';

export const OrderStoreEdit = ({...props}) => (
    <Edit title="Nova compra" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nome" validate={required()}/>
            <NumberInput source="price" label="Preço" validate={required()}/>
        </SimpleForm>
    </Edit>
);