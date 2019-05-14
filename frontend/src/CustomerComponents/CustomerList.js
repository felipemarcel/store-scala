import React from 'react';
import {
    Datagrid,
    List,
    TextField,
} from 'react-admin';


export const CustomerList = ({...props}) => {
    return (
        <List title="Clientes"
              {...props}
              bulkActions={false}>
            <Datagrid>
                <TextField source="id" label="id"/>
                <TextField source="firstName" label="Nome"/>
                <TextField source="lastName" label="Sobrenome"/>
            </Datagrid>
        </List>
    )
};