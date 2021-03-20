import React from 'react';
import ReactDOM from 'react-dom';

import { EditTask } from '../components/EditTask';

describe('Teste componente de editar tarefas', () => {

    it('Deve renderizar o componente sem erros', () => {

        const div = document.createElement('div');
        ReactDOM.render(<EditTask />, div);
        ReactDOM.unmountComponentAtNode(div);

    });

});