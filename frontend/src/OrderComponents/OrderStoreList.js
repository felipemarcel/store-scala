import React from 'react';
import {
    Datagrid,
    List,
    TextField,
    ArrayField,
    EditButton,
    ShowButton
} from 'react-admin';
import {DisabledPagination} from "../UtilComponents/DisabledPagination";


export const OrderStoreList = ({...props}) => {
    return (
        <List title="Compras"
              {...props}
              bulkActions={false}
              pagination={<DisabledPagination/>}>
            <Datagrid>
                <TextField source="id" sortable={false} label="id"/>
                <TextField source="status" sortable={false} label="Estado"/>
                <ArrayField source="products" sortable={false} label="Produtos">
                    <Datagrid>
                        <TextField source="quantity" sortable={false} label="Quantidade"/>
                        <TextField source="product.name" sortable={false} label="Nome"/>
                        <TextField source="product.price" sortable={false} label="Preço unitário"/>
                    </Datagrid>
                </ArrayField>
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>
    )
};