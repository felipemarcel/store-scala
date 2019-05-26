import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ArrayField,
    Datagrid
} from 'react-admin';

export const CustomerShow = ({...props}) => (
    <Show title="Informações cliente" {...props}>
        <SimpleShowLayout>
            <TextField source="firstName" label="Nome"/>
            <TextField source="lastName" label="Sobrenome"/>
            <ArrayField source="orders" sortable={false} label="Compras">
                <Datagrid>
                    <TextField source="status" label="status"/>
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);