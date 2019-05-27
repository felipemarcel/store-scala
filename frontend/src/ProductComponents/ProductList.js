import React from 'react';
import {
    Datagrid,
    List,
    TextField,
    EditButton,
    ShowButton
} from 'react-admin';
import {DisabledPagination} from "../UtilComponents/DisabledPagination";


export const ProductList = ({...props}) => {
    return (
        <List title="Produtos"
              {...props}
              bulkActions={false}
              pagination={<DisabledPagination/>}>
            <Datagrid>
                <TextField source="id" sortable={false} label="id"/>
                <TextField source="name" sortable={false} label="Nome"/>
                <TextField source="price" sortable={false} label="Preço"/>
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>
    )
};