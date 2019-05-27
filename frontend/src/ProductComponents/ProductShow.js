import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField
} from 'react-admin';

export const ProductShow = ({...props}) => (
    <Show title="Informações do produto" {...props}>
        <SimpleShowLayout>
            <TextField source="name" label="Nome"/>
            <NumberField source="price" label="Preço"/>
            <TextField source="pictureUrl" label="Endereço da imagem"/>
        </SimpleShowLayout>
    </Show>
);