import React from 'react';
import {Pagination} from 'react-admin';

export const DisabledPagination = props => <Pagination rowsPerPageOptions={[]} {...props} />