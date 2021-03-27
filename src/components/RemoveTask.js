import { useState } from 'react';
import PropTypes from 'prop-types';

import { 
    Button,
    Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export function RemoveTask(props) {

    const API_URL = 'http://localhost:3001/gerenciador-tarefas/';

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalError, setIsShowModalError] = useState(false);

    function handleClosedModal() {
        setIsShowModal(false);
    }

    function handleClosedModalError() {
        setIsShowModalError(false);
    }

    function handleOpenModal() {
        setIsShowModal(true);
    }

    async function handleRemoveTask() {
        
        try {
            await axios.delete(API_URL + props.task.id);
            setIsShowModal(false);
            props.loadTasks(true);
        } catch(erro) {
            setIsShowModal(false);
            setIsShowModalError(true);
        }
    }

    return (
        <>
            <Button 
                data-testid="btn-open-modal"
                className="btn btn-sm btn-danger"
                onClick={handleOpenModal}
            >
                <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Modal show={isShowModal} onHide={handleClosedModal} data-testid='modal'>
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

            <Modal show={isShowModalError} onHide={handleClosedModalError} data-testid='modal-error'>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   Atenção: ocorreu um erro ao remover a tarefa
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="warning"
                        onClick={handleClosedModalError}
                    >Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

RemoveTask.propTypes = {
    task: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired
}
