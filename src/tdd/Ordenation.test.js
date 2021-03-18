import React from 'react';
import ReactDOM from 'react-dom';

import { Ordernation } from '../components/Ordernation';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de ordenação.', () => {

    it('Deve renderizar o componente sem erros.', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Ordernation orderAsc={false} orderDesc={false}/>, div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a ordenação padrão.', () => {
        const { getByTestId } = render(
            <Ordernation orderAsc={false} orderDesc={false} />
        );

        expect(getByTestId("faSort")).not.toHaveClass('hidden');
        expect(getByTestId("faSortUp")).toHaveClass('hidden');
        expect(getByTestId("faSortDown")).toHaveClass('hidden');
    });

    it('Deve exibir a ordenação ascendente.', () => {
        const { getByTestId } = render(
            <Ordernation orderAsc={true} orderDesc={false} />
        );

        expect(getByTestId("faSort")).toHaveClass('hidden');
        expect(getByTestId("faSortUp")).not.toHaveClass('hidden');
        expect(getByTestId("faSortDown")).toHaveClass('hidden');
    });

    it('Deve exibir a ordenação descendente.', () => {
        const { getByTestId } = render(
            <Ordernation orderAsc={false} orderDesc={true} />
        );

        expect(getByTestId("faSort")).toHaveClass('hidden');
        expect(getByTestId("faSortUp")).toHaveClass('hidden');
        expect(getByTestId("faSortDown")).not.toHaveClass('hidden');
    });

});