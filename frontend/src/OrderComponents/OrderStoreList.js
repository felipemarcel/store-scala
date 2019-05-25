import React from 'react';
import {
    Datagrid,
    List,
    TextField,
    ArrayField,
    EditButton,
    ShowButton
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
                        <TextField source="product.name" label="Nome"/>
                        <TextField source="product.price" label="Preço unitário"/>
                    </Datagrid>
                </ArrayField>
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>
    )
};