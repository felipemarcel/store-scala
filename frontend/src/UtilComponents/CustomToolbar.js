import React from 'react';
import {
    Toolbar,
    SaveButton
} from 'react-admin';
import {withStyles} from '@material-ui/core';

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    }
};

export const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton/>
    </Toolbar>
));
