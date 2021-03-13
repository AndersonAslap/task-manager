import { A } from 'hookrouter';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';


export function ItensTask(props) {

    function checkCompleted(task) {
        return task.completed ? 'line-through' : 'none' ;
    }

    return (
        props.tasks.map(task => 
            <tr key={task.id} data-testid="task">
                <td 
                    width="75%" 
                    data-testid="name-task"
                    style={{ textDecoration: checkCompleted(task) }}
                > 
                    {task.name}
                </td>

                <td className="text-right">
                    <A href={"/atualizar/"+task.id}
                       className={ task.completed ? 'hidden' : 'btn btn-sm btn-warning'}> 
                        <FontAwesomeIcon icon={faEdit} />
                    </A>
                </td>
            </tr>
        )
    );

}

ItensTask.propTypes = {
    tasks: PropTypes.array.isRequired,
    loadTasks: PropTypes.func.isRequired
}

