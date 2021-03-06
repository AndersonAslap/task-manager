import React from 'react';
import { useRoutes } from 'hookrouter';
import { CreateTask } from './CreateTask';
import { EditTask } from './EditTask';
import { TaskList } from './TaskList';

const routes = {
    '/' : () => <TaskList />,
    '/create' : () => <CreateTask />,
    '/edit/:id' : ({id}) => <EditTask id={id} />
}

export function ManagerTask() {
    return useRoutes(routes);
}