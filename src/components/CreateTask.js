import { useState } from 'react';

import { navigate, A } from 'hookrouter';

import {
    Button,
    Form,
    Jumbotron,
    Modal
} from 'react-bootstrap';

import { Task } from '../models/Task.model';

import axios from 'axios';

export function CreateTask() {

    const API_URL = 'http://localhost:3001/gerenciador-tarefas/';

    const [task, setTask] = useState('');

    const [isValidated, setIsValidated] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalError, setIsShowModalError] = useState(false);

    function handleTask(event) {
        setTask(event.target.value);
    }

    async function handleCreateTask(event) {
        
        event.preventDefault();
        setIsValidated(true);

        if (event.currentTarget.checkValidity() === true) {

            try {

                const newTask = new Task(null, task, false);

                await axios.post(API_URL, newTask);
                setIsShowModal(true);

            } catch (erro) {
                setIsShowModalError(true);
            }
        }

    }

    function handleModal() {
        setIsShowModal(false); 
        navigate("/");
    }

    function handleModalError() {
        setIsShowModalError(false);
    }

    return (
        <div>
            <h3 className="text-center">Cadastar</h3>
            
            <Jumbotron>
                <Form
                    validated={isValidated}
                    noValidate 
                    onSubmit={handleCreateTask}
                >
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        
                        <Form.Control 
                            type="text"
                            placeholder="Digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required 
                            value={task}
                            onChange={handleTask}
                            data-testid = "txt-task"
                        />

                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button 
                            variant="success"
                            type="submit" 
                            data-testid = "btn-create-task"  
                        >Cadastrar
                        </Button>

                        &nbsp;

                       <A href="/" className="btn btn-info">Voltar</A>
                    </Form.Group>
                </Form>

                <Modal show={isShowModal} onHide={handleModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        Tarefa adicionada com sucesso
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="success" onClick={handleModal}>Continuar</Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={isShowModalError} onHide={handleModalError} data-testid="modal-error">
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        Erro ao adicionar tarefa, tente novamente em instantes.
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleModalError}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );
}