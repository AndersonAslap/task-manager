import React from 'react';
import ReactDOM from 'react-dom';

import { PaginationComponent } from '../components/PaginationComponent';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componete de Paginação', () => {

    it('Deve renderizar o componente sem erros.', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PaginationComponent 
                            changePage={() => false} 
                            amountItems={1}
                            currentPage={1}
                            itemsPages={1}
                        />, 
                        div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a paginação contendo 3 páginas', () => {
        
        const { getByTestId } = render(
            <PaginationComponent 
                amountItems={15}
                itemsPages={5}
                currentPage={1}
                changePage={() => false}
            />
        );

        const pagination = getByTestId('pagination');
        expect(pagination).toHaveTextContent('1');
        expect(pagination).toHaveTextContent('2');
        expect(pagination).toHaveTextContent('3');
    }) 

});