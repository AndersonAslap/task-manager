import ReactDOM from 'react-dom';
import { RemoveTask } from '../components/RemoveTask';
import { Task } from '../models/Task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Teste do componente de remover tarefa.', () => {

    const nameTask = 'Tarefa';
    const task = new Task(1, nameTask, false);

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RemoveTask task={task} loadTasks={() => {return false}}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a modal', () => {
        const { getByTestId } = render(
            <RemoveTask task={task} loadTasks={() => {return false}}/>
        );

        fireEvent.click(getByTestId('btn-open-modal'));
        expect(getByTestId('modal')).toHaveTextContent(nameTask);
    });

    it('Deve remover uma tarefa', () => {
        localStorage['tasks'] = JSON.stringify([task]);
        const { getByTestId } = render(
            <RemoveTask task={task} loadTasks={() => {return false}}/>
        );

        fireEvent.click(getByTestId('btn-open-modal'));
        fireEvent.click(getByTestId('btn-remove-task'));

        const tasksDB = JSON.parse(localStorage['tasks']);
        expect(tasksDB.length).toBe(0);
    });


})