import React from 'react';

const Pagination = ({ nftPerPage, currentPage, totalNFT, paginate }) => {
    const pageNumbers = [];
    // console.log("nftPerPage: "+ nftPerPage);
    //  console.log("currentPage: "+ currentPage);

    for (let i = 1; i <= Math.ceil(totalNFT / nftPerPage); i++) {
        pageNumbers.push(i);
    }
// console.log("PageNumbers: "+ pageNumbers);
    return (
        <div>
            <div className='pagination-div'>
                <ul className='pagination justify-content-center mb-0'>
                    {pageNumbers.map(number => (
                        
                    <li key={number} className={(currentPage === number)?'page-item active':'page-item ' }>
                        <button onClick={() => paginate(number)} className='page-link'>
                        <b>{number}</b>
                        </button>
                    </li>
                    ))}
                </ul>
            </div>
            
            {/* <ul class="pagination mb-0">
                <li class="page-item"><a href="#" class="page-link prev">Prev</a></li>
                <li class="page-item"><a href="#" class="page-link">1</a></li>
                <li class="page-item"><a href="#" class="page-link">2</a></li>
                <li class="page-item active"><a href="#" class="page-link">3</a></li>
                <li class="page-item"><a href="#" class="page-link">4</a></li>
                <li class="page-item"><a href="#" class="page-link">5</a></li>
                <li class="page-item"><a href="#" class="page-link next">Next</a></li>
            </ul> */}
        </div>
    );
};

export default Pagination;