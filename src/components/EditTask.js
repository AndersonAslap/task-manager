import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { navigate, A } from 'hookrouter';

import {
    Button,
    Form,
    Jumbotron,
    Modal
} from 'react-bootstrap';

import axios from 'axios';

import { Task } from '../models/Task.model';

export function EditTask(props) {

    const API_URL = 'http://localhost:3001/gerenciador-tarefas/';

    const [task, setTask] = useState();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalError, setIsShowModalError] = useState(false);
    const [isFormValidated, setIsFormValidated] = useState(false);

    const [isLoadTask, setIsLoadTask] = useState(true);

    useEffect(() => {

        async function getTask() {
            try {

                let { data } = await axios.get(API_URL + props.id);
                setTask(data.name);

            } catch(erro) {
                alert(erro);
            }
        }

        if (isLoadTask) {

            getTask();
            
            setIsLoadTask(false);
        }

    }, [isLoadTask, props]);

    function handleSetTask(event) {
        event.preventDefault();
        setTask(event.target.value);
    }

    function handleClosedModal() {
        navigate("/");
    }

    function handleBack() {
        navigate("/");
    }

    async function handleUpdate(event) {
        event.preventDefault();
        setIsFormValidated(true);

        if (event.currentTarget.checkValidity() === true) {
            try {
                
                const taskUpdate = new Task(null, task, false);
                await axios.put(API_URL + props.id, taskUpdate);
                setIsShowModal(true);

            } catch(erro) {
                setIsShowModalError(true);
            }
           
        }

    }

    function handleClosedModalError() {
        setIsShowModalError(false);
    }

    return (
        <div>
            <h3 className="text-center">Editar Tarefa</h3>
            <Jumbotron>
                <Form onSubmit={handleUpdate} noValidate validated={isFormValidated}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            value={task}
                            onChange={handleSetTask}
                            minLength="5"
                            maxLength="100"
                            required
                            placeholder="Digite a tarefa"
                            data-testid="task-name"
                        />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button type="submit" data-testid="btn-update-task" variant="success">
                            Sim
                        </Button>
                        &nbsp;
                        <A href="/" className="btn btn-danger" onClick={handleBack}>Voltar</A>
                    </Form.Group>

                </Form>


                <Modal show={isShowModal} data-testid="modal">
                    <Modal.Header>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        Tarefa atualizada com sucesso
                    </Modal.Body>
                        
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClosedModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={isShowModalError} data-testid="modal-error">
                    <Modal.Header>
                        <Modal.Title>Erro</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        Atenção : ocorreu um erro ao atualizar a tarefa, tentar novamente em instantes
                    </Modal.Body>
                        
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleClosedModalError}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );
}

