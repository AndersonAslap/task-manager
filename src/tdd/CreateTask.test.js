import React from 'react';
import ReactDOM from 'react-dom';
import { CreateTask } from '../components/CreateTask';

describe('Swtch de testes do componente CreateTask', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreateTask />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});