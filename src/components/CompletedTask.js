import { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Modal,
    Button
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export function CompletedTask(props) {

    const API_URL = 'http://localhost:3001/gerenciador-tarefas/:id/concluir';

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalError, setIsShowModalError] = useState(false);

    function handleOpenModal(event) {
        event.preventDefault();
        setIsShowModal(true);
    }

    function handleClosedModal() {
        setIsShowModal(false);
    }

    function handleModalError() {
        setIsShowModalError(false);
    }

    async function handleCompletedTask(event) {
        event.preventDefault();

        try {

            await axios.put(API_URL.replace(':id', props.task.id));
            handleClosedModal();
            props.loadTasks(true);

        } catch(error) {
            setIsShowModal(false);
            setIsShowModalError(true);
        }
        
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

            <Modal show={isShowModalError} onHide={handleModalError} data-testid="modal-error">
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        Erro ao concluir tarefa, tente novamente em instantes.
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleModalError}>Fechar</Button>
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
