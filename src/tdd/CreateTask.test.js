import React from 'react';
import ReactDOM from 'react-dom';
import { CreateTask } from '../components/CreateTask';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Teste do componente de cadastro de tarefas', () => {

    it('Deve renderizar  o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreateTask />, div);
        ReactDOM.unmountComponentAtNode(div)
    });

    it('Deve cadastrar uma nova tarefa', () => {
        const { getByTestId } = render(<CreateTask />);
        fireEvent.change(getByTestId('txt-task'), { target: { value: 'Testar cadastro' } });
        fireEvent.click(getByTestId('btn-create-task'));
        expect(getByTestId('modal')).toHaveTextContent('Sucesso');
        expect(getByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso');
    });

});