import React from 'react';
import {
    Edit,
    required,
    SimpleForm,
    TextInput
} from 'react-admin';
import {CustomToolbar} from '../UtilComponents/CustomToolbar';
import {CustomActions} from '../UtilComponents/CustomActions';

export const CustomerEdit = ({...props}) => (
    <Edit title="Editar cliente" actions={<CustomActions/>} {...props}>
        <SimpleForm toolbar={<CustomToolbar/>}>
            <TextInput source="firstName" label="Nome" validate={required()}/>
            <TextInput source="lastName" label="Sobrenome" validate={required()}/>
        </SimpleForm>
    </Edit>
);