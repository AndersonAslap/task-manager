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
import { PaginationComponent } from './PaginationComponent';

export function ListTask() {

    const ITENS_PAGES = 3;

    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);

    const [amountItens, setAmountItens] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        function getTasks() {
            const tasksDB = localStorage['tasks'];
            let tasksList = tasksDB ? JSON.parse(tasksDB) : [] ;
            setAmountItens(tasksList.length);
            setTasks(tasksList.splice((currentPage - 1) * ITENS_PAGES, ITENS_PAGES));
        }

        if (loadTasks) {
            getTasks();
            setLoadTasks(false);
        }
           
    }, [loadTasks, currentPage]);

    function handleChangePage(page) {
        setCurrentPage(page);
        setLoadTasks(true);
    }

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
            <PaginationComponent 
                amountItems={amountItens}
                itemsPages={ITENS_PAGES}
                currentPage={currentPage}
                changePage={handleChangePage}
            />
        </div>
    );
}