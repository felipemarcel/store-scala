import React from 'react';
import {
    Edit,
    required,
    SimpleForm,
    TextInput,
    required,
    NumberInput
} from 'react-admin';

export const ProductEdit = ({...props}) => (
    <Edit title="Novo produto" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nome" validate={required()}/>
            <NumberInput source="price" label="Preço" validate={required()}/>
            <TextInput source="pictureUrl" label="Endereço da imagem" validate={required()}/>
        </SimpleForm>
    </Edit>
);