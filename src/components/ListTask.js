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
import { Ordernation } from '../components/Ordernation';

export function ListTask() {

    const ITENS_PAGES = 3;

    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);

    const [amountItens, setAmountItens] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [isOrderAsc, setIsOrderAsc] = useState(false);
    const [isOrderDesc, setIsOrderDesc] = useState(false);

    useEffect(() => {

        function getTasks() {
            const tasksDB = localStorage['tasks'];
            let tasksList = tasksDB ? JSON.parse(tasksDB) : [] ;
            
            if (isOrderAsc) {
                tasksList.sort((task1, task2) => (task1.name.toLowerCase() > task2.name.toLowerCase()) ? 1 : -1 );
            } else if (isOrderDesc) {
                tasksList.sort((task1, task2) => (task1.name.toLowerCase() < task2.name.toLowerCase()) ? 1 : -1 );
            }
            
            setAmountItens(tasksList.length);
            setTasks(tasksList.splice((currentPage - 1) * ITENS_PAGES, ITENS_PAGES));
        }

        if (loadTasks) {
            getTasks();
            setLoadTasks(false);
        }
           
    }, [loadTasks, currentPage, isOrderAsc, isOrderDesc]);

    function handleChangePage(page) {
        setCurrentPage(page);
        setLoadTasks(true);
    }

    function handleOrderBy(event) {
        event.preventDefault();

        if (!isOrderAsc && !isOrderDesc) {
            setIsOrderAsc(true);
            setIsOrderDesc(false);
        } else if (isOrderAsc) {
            setIsOrderAsc(false);
            setIsOrderDesc(true);
        } else {
            setIsOrderAsc(false);
            setIsOrderDesc(false);
        }

        setLoadTasks(true);
    }

    return (
        <div className="text-center container">
            <h3>Tarefas a fazer</h3>
            <Table striped bordered hover responsive data-testid="table-tasks">
                <thead>
                    <tr>
                        <th>
                            <a href="/" onClick={handleOrderBy}>
                                Tarefa
                                &nbsp;
                                <Ordernation 
                                    orderAsc={isOrderAsc}
                                    orderDesc={isOrderDesc}
                                />
                            </a>
                        
                        </th>
                        
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