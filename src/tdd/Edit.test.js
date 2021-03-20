import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Task } from '../models/Task.model';

import { EditTask } from '../components/EditTask';

describe('Teste componente de editar tarefas', () => {

    const task = new Task(1, 'Nova tarefa', false);

    beforeEach(() => {
        localStorage['tasks'] = JSON.stringify([task]);
    });

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<EditTask id={1} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a modal de sucesso ao atualizar uma tarefa.', () => {
        const { getByTestId } = render(<EditTask id={1} />);
        fireEvent.click(getByTestId("btn-update-task"));
        expect(getByTestId("modal")).toHaveTextContent("Sucesso");
    });

    it('Deve atualizar uma tarefa', () => {
        const nameTask = 'Tarefa atualizada';

        const { getByTestId } = render( <EditTask id={1} />);
        fireEvent.change(getByTestId("task-name"), { target : { value : nameTask } });
        fireEvent.click(getByTestId("btn-update-task"));
        
        const tasksDB = JSON.parse(localStorage['tasks']);
        expect(tasksDB[0].name).toBe(nameTask);
    })

});