import React from 'react';
import ReactDOM from 'react-dom';
import { EditTask } from '../components/EditTask';

describe('Swtch de testes do componente EditTask', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<EditTask />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});