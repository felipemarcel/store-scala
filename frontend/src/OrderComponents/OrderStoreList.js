import React from 'react';
import {
    Datagrid,
    List,
    TextField,
    ArrayField
} from 'react-admin';


export const OrderStoreList = ({...props}) => {
    return (
        <List title="Compras"
              {...props}
              bulkActions={false}>
            <Datagrid>
                <TextField source="id" label="id"/>
                <TextField source="status" label="Estado"/>
                <ArrayField source="products" label="Produtos">
                    <Datagrid>
                        <TextField source="quantity" label="Quantidade"/>
                        <TextField source="name" label="Nome"/>
                        <TextField source="price" label="Preço unitário"/>
                    </Datagrid>
                </ArrayField>
            </Datagrid>
        </List>
    )
};