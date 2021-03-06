import React from 'react';
import ReactDOM from 'react-dom';
import { ManagerTask } from '../components/ManagerTask';

describe('Swtch de testes do componente ManagerTask', () => {

    it('Deve renderizar o projeto sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ManagerTask />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});