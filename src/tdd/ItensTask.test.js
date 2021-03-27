import ReactDOM from 'react-dom';
import { Task } from '../models/Task.model';
import { ItensTask } from '../components/ItensTask';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Teste do componente que exibe um item da listagem de tarefas', () => {

    const nameTask = 'Tarefa';
    const task = new Task(1, nameTask, false);
    const taskCompleted = new Task(2, nameTask, true);

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ItensTask tasks={[]} loadTasks={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a tarefa', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensTask tasks={[task]} loadTasks={() => false} />
                </tbody>
            </table>
        );

        expect(getByTestId('task')).toHaveTextContent(nameTask);
    });

    it('Deve uma tarefa concluida', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensTask tasks={[taskCompleted]} loadTasks={() => false} />
                </tbody>
            </table>
        );

        expect(getByTestId('name-task')).toHaveStyle('text-decoration: line-through');
    });


});