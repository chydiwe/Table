import React from "react";
import './pagination.css'

export const Pagination = ({dataLength, elPerPage, getPage, currentPage}) =>

    <div className='Table_Pagination_Pages Pages'>
        {[...Array(Math.ceil(dataLength / elPerPage))].map((_, i) =>
            <li className={i+1 === currentPage ? 'Table_Pagination_Pages_Page pagination pageSelect' : 'Table_Pagination_Pages_Page pagination'}
                key={i+1} id={i+1} onClick={getPage}>{i+1}
            </li>)}

    </div>
