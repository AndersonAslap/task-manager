import React from 'react';
import ReactDOM from 'react-dom';

import { ListTask } from '../components/ListTask';
import { Task } from '../models/Task.model';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Teste do componente Listar tarefa.', () => {

    const task1 = 'Primeira tarefa';
    const task2 = 'Segunda tarefa';
    const task3 = 'Terceira tarefa';

    beforeEach(() => {
        localStorage['tasks'] = JSON.stringify([
            new Task(1,task1,false),
            new Task(2,task2,false),
            new Task(3,task3,false)
        ]);
    });

    afterEach(() => {
        delete localStorage['tasks'];
    });

    it('Deve renderizar o componente sem erros.', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ListTask />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir uma tabela contendo 3 tarefas', () => {
        const { getByTestId } = render(<ListTask />);
        const table = getByTestId('table-tasks');

        expect(table).toHaveTextContent(task1);
        expect(table).toHaveTextContent(task2);
        expect(table).toHaveTextContent(task3);
    });

    it('Deve filtrar os dados da tabela', () => {
        const { getByTestId } = render( <ListTask /> );
        fireEvent.change(getByTestId('field-search'), { target : { value : task1 } });
        
        const table = getByTestId('table-tasks');
        expect(table).toHaveTextContent(task1);
        expect(table).not.toHaveTextContent(task2);
        expect(table).not.toHaveTextContent(task3);
    });


});