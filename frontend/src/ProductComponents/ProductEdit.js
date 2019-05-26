import React from 'react';
import {
    Edit,
    required,
    SimpleForm,
    TextInput,
    NumberInput
} from 'react-admin';
import {CustomActions} from "../UtilComponents/CustomActions";
import {CustomToolbar} from "../UtilComponents/CustomToolbar";

export const ProductEdit = ({...props}) => (
    <Edit title="Editar produto" actions={<CustomActions/>} {...props}>
        <SimpleForm toolbar={<CustomToolbar/>}>
            <TextInput source="name" label="Nome" validate={required()}/>
            <NumberInput source="price" label="Preço" validate={required()}/>
            <TextInput source="pictureUrl" label="Endereço da imagem" validate={required()}/>
        </SimpleForm>
    </Edit>
);