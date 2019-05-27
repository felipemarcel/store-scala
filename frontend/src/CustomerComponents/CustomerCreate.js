import React from 'react';
import {
    Create,
    required,
    SimpleForm,
    TextInput
} from 'react-admin';

const defaultValue = {orders: []};

export const CustomerCreate = ({...props}) => (
    <Create title="Novo cliente" {...props}>
        <SimpleForm defaultValue={defaultValue}>
            <TextInput source="firstName" label="Nome" validate={required()}/>
            <TextInput source="lastName" label="Sobrenome" validate={required()}/>
        </SimpleForm>
    </Create>
);