import React from 'react';
import {ListButton} from 'react-admin';
import CardActions from '@material-ui/core/CardActions';

export const CustomActions = ({basepath, data, resource}) => (
    <CardActions>
        <ListButton basepath={basepath}/>
    </CardActions>
);