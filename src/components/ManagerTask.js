import { useRoutes } from 'hookrouter';

import { CreateTask } from './CreateTask';
import { ListTask } from './ListTask';
import { EditTask } from './EditTask';

const routes = {
    '/' : () => <ListTask />,
    '/cadastrar' : () => <CreateTask />,
    '/atualizar/:id' : ({id}) => <EditTask id={id} /> 
}

export function ManagerTask() {
    return useRoutes(routes);
}