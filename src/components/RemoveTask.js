import { useState } from 'react';
import PropTypes from 'prop-types';

import { 
    Button,
    Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function RemoveTask(props) {

    const [isShowModal, setIsShowModal] = useState(false);

    function handleClosedModal() {
        setIsShowModal(false);
    }

    function handleOpenModal() {
        setIsShowModal(true);
    }

    function handleRemoveTask() {
        const tasksDB = localStorage['tasks'];
        let tasks = tasksDB ? JSON.parse(tasksDB) : [];

        tasks = tasks.filter((task) => { return task.id !== props.task.id } );

        localStorage['tasks'] = JSON.stringify(tasks);

        props.loadTasks(true);
    }

    return (
        <>
            <Button 
                data-testid="btn-remove-task"
                className="btn btn-sm btn-danger"
                onClick={handleOpenModal}
            >
                <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Modal show={isShowModal} onHide={handleClosedModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Remover tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Certeza que deseja remover esta tarefa ?
                    <br />
                    <strong>{props.task.name}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        data-testid="btn-remove-task" 
                        className="btn btn-sm btn-danger"
                        onClick={handleRemoveTask}
                    >Sim</Button>
                    &nbsp;
                    <Button 
                        className="btn btn-sm btn-info"
                        onClick={handleClosedModal}
                    >Não</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

RemoveTask.propTypes = {
    task: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired
}
