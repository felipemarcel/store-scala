import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField
} from 'react-admin';

export const OrderStoreShow = ({...props}) => (
    <Show title="Informações da compra" {...props}>
        <SimpleShowLayout>
            <TextField source="name" label="Nome"/>
            <NumberField source="price" label="Preço"/>
        </SimpleShowLayout>
    </Show>
);