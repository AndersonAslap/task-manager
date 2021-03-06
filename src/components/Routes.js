import React from 'react';
import { useRoutes } from 'hookrouter';
import { EditTask } from './EditTask';
import { ManagerTask } from './ManagerTask';

const routes = {
    '/' : () => <ManagerTask />,
    '/edit/:id' : ({id}) => <EditTask id={id} />
}

export function Routes() {
    return useRoutes(routes);
}