import React from 'react';
import {
    Create,
    required,
    SimpleForm,
    TextInput,
    NumberInput
} from 'react-admin';

export const ProductCreate = ({...props}) => (
    <Create title="Novo produto" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nome" validate={required()}/>
            <NumberInput source="price" label="Preço" validate={required()}/>
            <TextInput source="pictureUrl" label="Endereço da imagem" validate={required()}/>
        </SimpleForm>
    </Create>
);