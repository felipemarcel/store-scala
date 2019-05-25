import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField
} from 'react-admin';

export const CustomerShow = ({...props}) => (
    <Show title="Informações cliente" {...props}>
        <SimpleShowLayout>
            <TextField source="firstName" label="Nome"/>
            <TextField source="lastName" label="Sobrenome"/>
        </SimpleShowLayout>
    </Show>
);