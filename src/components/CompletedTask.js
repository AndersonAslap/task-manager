import { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Modal,
    Button
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

export function CompletedTask(props) {

    const [isShowModal, setIsShowModal] = useState(false);

    function handleOpenModal(event) {
        event.preventDefault();
        setIsShowModal(true);
    }

    function handleClosedModal() {
        setIsShowModal(false);
    }

    function handleCompletedTask(event) {
        event.preventDefault();

        const tasksDB = localStorage['tasks'];
        const tasks = tasksDB ? JSON.parse(tasksDB) : [] ;

        tasks.map(task => {
            if(task.id === props.task.id) {
                task.completed = true;
            }

            return task;
        })

        localStorage['tasks'] = JSON.stringify(tasks);
        handleClosedModal();
        props.loadTasks(true);
    }

    return (
        <>
            <span className={props.className}>
                <Button 
                    className="btn btn-sm"
                    onClick={handleOpenModal}
                    data-testid="btn-open-modal"
                >
                    <FontAwesomeIcon icon={faClipboardCheck}/>
                </Button>
            </span>

            <Modal 
                show={isShowModal} 
                onHide={handleClosedModal}
                data-testid="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Concluir Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Deseja realmente concluir a seguinte tarefa ? <br />
                    <strong>{props.task.name}</strong>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleCompletedTask}
                        data-testid="btn-completed-task"
                    >
                        Sim
                    </Button>

                    <Button 
                        variant="info" 
                        onClick={handleClosedModal}
                        data-testid="btn-closed-modal"
                    >
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

CompletedTask.propTypes = {
    task: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired,
    className: PropTypes.string
}
