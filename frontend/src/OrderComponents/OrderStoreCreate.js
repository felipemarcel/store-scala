import React from 'react';
import {
    Create,
    required,
    SimpleForm,
    TextInput,
    NumberInput
} from 'react-admin';

const defaultValue = {products: [], status: true};

export const OrderStoreCreate = ({...props}) => (
    <Create title="Nova compra" {...props}>
        <SimpleForm defaultValue={defaultValue}>
            <TextInput source="name" label="Nome" validate={required()}/>
            <NumberInput source="price" label="Preço" validate={required()}/>
        </SimpleForm>
    </Create>
);