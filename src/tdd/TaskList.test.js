import React from 'react';
import ReactDOM from 'react-dom';
import { TaskList } from '../components/TaskList';

describe('Swtch de testes do componente TaskList', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TaskList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});