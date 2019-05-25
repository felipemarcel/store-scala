import React from 'react';
import {
    Edit,
    required,
    SimpleForm,
    TextInput
} from 'react-admin';

export const CustomerEdit = ({...props}) => (
    <Edit title="Editar cliente" {...props}>
        <SimpleForm>
            <TextInput source="firstName" label="Nome" validate={required()}/>
            <TextInput source="lastName" label="Sobrenome" validate={required()}/>
        </SimpleForm>
    </Edit>
);