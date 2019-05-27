import React from 'react';
import {
    Datagrid,
    List,
    TextField,
    EditButton,
    ShowButton
} from 'react-admin';
import {DisabledPagination} from "../UtilComponents/DisabledPagination";


export const CustomerList = ({...props}) => {
    return (
        <List title="Clientes"
              {...props}
              bulkActions={false}
              pagination={<DisabledPagination/>}>
            <Datagrid>
                <TextField source="id" sortable={false} label="id"/>
                <TextField source="firstName" sortable={false} label="Nome"/>
                <TextField source="lastName" sortable={false} label="Sobrenome"/>
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>
    )
};