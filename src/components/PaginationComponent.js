import PropTypes from 'prop-types';

import {
    Pagination
} from 'react-bootstrap';

export function PaginationComponent(props) {

    function handleGenerateFirstItem() {
        return (
            <Pagination.First 
                key="pageFirst"
                onClick={() => props.changePage(1)}
                disabled={props.currentPage === 1}
            />
        )
    }

    function handleGeneratePreviousItem() {
        return (
            <Pagination.Prev 
                key="pagePrevious"
                onClick={() => props.changePage(props.currentPage - 1)}
                disabled={props.currentPage === 1}
            />
        );
    }

    function handleGenerateItemNumber(page) {
        return (
            <Pagination.Item
                key={page}
                active={page === props.currentPage}
                onClick={() => props.changePage(page)}
            >{page}
            </Pagination.Item>
        );
    }

    function handleGenerateNextItem(numberPages) {
        return (
            <Pagination.Next
                key="pageNext"
                onClick={() => props.changePage(props.currentPage + 1)}
                disabled={props.currentPage === numberPages}
            />
        );
    }

    function handleGenerateLastItem(numberPages) {
        return (
            <Pagination.Last
                key="pageLast"
                onClick={() => props.changePage(numberPages)}
                disabled={props.changePage === numberPages}
            >

            </Pagination.Last>
        );
    }


    function handleGetPagination() {
        const numberPages = Math.ceil(props.amountItems / props.itemsPages);

        let items = [];
        items.push(handleGenerateFirstItem());
        items.push(handleGeneratePreviousItem());

        for(let page = 1; page <= numberPages; page++) {
            items.push(handleGenerateItemNumber(page));
        }

        items.push(handleGenerateNextItem());
        items.push(handleGenerateLastItem(numberPages));

        return items;
    }

    return (
        <Pagination data-testid="pagination">
            {handleGetPagination}
        </Pagination>
    );
}

PaginationComponent.propTypes = {
    amountItems : PropTypes.number.isRequired,
    itemsPages : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    changePage : PropTypes.func.isRequired
}