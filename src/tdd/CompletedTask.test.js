import ReactDOM from 'react-dom';

import { CompletedTask } from '../components/CompletedTask';
import { Task } from '../models/Task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Deve testar o componente de conclir tarefa', () => {

    const nameTask = "Tarefa Teste";
    const task = new Task(1, nameTask, false); 

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CompletedTask 
                            task={task} 
                            loadTasks={() => false}
                        />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a modal', () => {
        const { getByTestId } = render(<CompletedTask 
                                            task={task} 
                                            loadTasks={() => false}
                                        />);
        
        fireEvent.click(getByTestId('btn-open-modal'));
        expect(getByTestId('modal')).toHaveTextContent('Tarefa')                                
    });

    it('Deve concluir uma tarefa', () => {
        localStorage['tasks'] = JSON.stringify([task]);
        
        const { getByTestId } = render(<CompletedTask 
                                            task={task} 
                                            loadTasks={() => false}
                                        />);
        
        fireEvent.click(getByTestId('btn-open-modal'));
        fireEvent.click(getByTestId('btn-completed-task'));

        const tasksDB = JSON.parse(localStorage['tasks']);
        expect(tasksDB[0].completed).toBeTruthy();
    });

});