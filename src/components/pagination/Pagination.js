import React from 'react';

const Pagination = ({postsPerPage, totalPosts, currentPage, pageClickHandler}) => {
    const totalPageNumbers = [];
    const filteredPageNumbers = [];


    for (let i = 1; i<= Math.ceil(totalPosts / postsPerPage); i++) {
        totalPageNumbers.push(i)
    }

    // if (currentPage > 4) {
    //     filteredPageNumbers.push(1,'...',currentPage-1,currentPage)
    // } else {
    //     let pages = Array.from({length: currentPage}, (v, k) => k+1);
    //     filteredPageNumbers.push(...pages)
    // }
    //
    // if (totalPageNumbers.length - currentPage > 3) {
    //     filteredPageNumbers.push(currentPage + 1, '...', totalPageNumbers.length)
    // } else {
    //     filteredPageNumbers.push(currentPage + 1, currentPage + 2, currentPage + 3)
    // }

    if (totalPageNumbers.length > 5) {
        if (currentPage > 2) {
            filteredPageNumbers.push(currentPage-2, currentPage-1,currentPage)
        } else if (currentPage > 1) {
            filteredPageNumbers.push(currentPage-1, currentPage)
        } else {
            filteredPageNumbers.push(currentPage)
        }

        if (totalPageNumbers.length - currentPage > 2) {
            filteredPageNumbers.push(currentPage+1,currentPage+2)
        } else {
            if (currentPage !== totalPageNumbers.length) {
                filteredPageNumbers.push(currentPage+1,currentPage+2)
            }
        }
    } else {
        filteredPageNumbers.push(...totalPageNumbers)
    }

    console.log(currentPage)
    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && 'disabled'}`}><a className="page-link" href="#" onClick={() => pageClickHandler(currentPage-1)}>Previous</a></li>
                {filteredPageNumbers.map(number => (
                    <li className={`page-item ${number.toString() === currentPage.toString() && 'active'}`} key={number}>
                        <a className="page-link" href="!#" onClick={() => pageClickHandler(number)}>{number}</a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPageNumbers.length && 'disabled'}`}><a className="page-link" href="#" onClick={() => pageClickHandler(currentPage+1)}>Next</a></li>
            </ul>
        </nav>
    );
};

export default Pagination;
