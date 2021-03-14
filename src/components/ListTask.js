import { useState, useEffect } from 'react';
import { A } from 'hookrouter';

import {
    Table
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faPlus
} from '@fortawesome/free-solid-svg-icons'

import { ItensTask } from './ItensTask';

export function ListTask() {

    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);

    useEffect(() => {

        function getTasks() {
            const tasksDB = localStorage['tasks'];
            let tasksList = tasksDB ? JSON.parse(tasksDB) : [] ;
            setTasks(tasksList);
        }

        if (loadTasks) {
            getTasks();
            setLoadTasks(false);
        }
           
    }, [loadTasks]);

    return (
        <div className="text-center container">
            <h3>Tarefas a fazer</h3>
            <Table striped bordered hover responsive data-testid="table-tasks">
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>
                            <A 
                                href="/cadastrar" 
                                className="btn btn-sm btn-success"
                                data-testid="btn-add-task"
                            >
                                <FontAwesomeIcon icon={faPlus}/> &nbsp;
                                Nova tarefa
                            </A>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <ItensTask 
                        tasks={tasks} 
                        loadTasks={setLoadTasks}
                    />
                </tbody>
            </Table>
        </div>
    );
}