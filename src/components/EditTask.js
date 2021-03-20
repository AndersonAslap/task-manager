import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { navigate, A } from 'hookrouter';

import {
    Button,
    Form,
    Jumbotron,
    Modal
} from 'react-bootstrap';

export function EditTask(props) {

    const [task, setTask] = useState();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isFormValidated, setIsFormValidated] = useState(false);

    const [isLoadTask, setIsLoadTask] = useState(true);

    useEffect(() => {

        if (isLoadTask) {

            const tasksDB = localStorage['tasks'];
            const tasks = tasksDB ? JSON.parse(tasksDB) : [] ;

            const currentTask = tasks.filter(
                task => task.id === parseInt(props.id)
            )[0];
            
            setTask(currentTask.name);
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

    function handleUpdate(event) {
        event.preventDefault();
        setIsFormValidated(true);

        if (event.currentTarget.checkValidity() === true) {

            const tasksDB = localStorage['tasks'];
            let tasks = tasksDB ? JSON.parse(tasksDB) : [] ;

            tasks = tasks.map(taskObj => {
                if(taskObj.id === parseInt(props.id)) {
                    taskObj.name = task;
                }

                return taskObj;
            });

            localStorage['tasks'] = JSON.stringify(tasks);

            setIsShowModal(true);
        }

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
            </Jumbotron>
        </div>
    );
}

