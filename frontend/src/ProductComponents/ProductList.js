import React from 'react';
import {
    Datagrid,
    List,
    TextField,
    EditButton,
    ShowButton
} from 'react-admin';


export const ProductList = ({...props}) => {
    return (
        <List title="Produtos"
              {...props}
              bulkActions={false}>
            <Datagrid>
                <TextField source="id" label="id"/>
                <TextField source="name" label="Nome"/>
                <TextField source="price" label="Preço"/>
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>
    )
};