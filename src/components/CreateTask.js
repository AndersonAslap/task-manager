import { useState } from 'react';

import { navigate, A } from 'hookrouter';

import {
    Button,
    Form,
    Jumbotron,
    Modal
} from 'react-bootstrap';

export function CreateTask() {

    const [task, setTask] = useState('');

    const [isValidated, setIsValidated] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    function handleTask(event) {
        setTask(event.target.value);
    }

    function handleCreateTask(event) {
        event.preventDefault();
    }

    function handleModal() {
        setIsShowModal(false); 
        navigate("/");
    }

    return (
        <div>
            <h3 className="text-center">Cadastar</h3>
            
            <Jumbotron>
                <form 
                    noValidate={isValidated} 
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
                        />

                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button 
                            variant="success"
                            type="submit"   
                        >Cadastrar
                        </Button>

                        &nbsp;

                       <A href="/" className="btn btn-info">Voltar</A>
                    </Form.Group>
                </form>

                <Modal show={isShowModal} onHide={handleModal}>
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
            </Jumbotron>
        </div>
    );
}