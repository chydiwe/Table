import React from "react";
import './pagination.css'
export const Pagination = ({dataLength,elPerPage,getPage,currentPage}) =>

    <div className='Table_Pagination_Pages Pages'>
        {[...Array(Math.ceil(dataLength /elPerPage))].map((_, i) =>
            <RenderPageNumbers getPage={getPage} currentPage={currentPage} number={i + 1}/>)}
    </div>


const RenderPageNumbers = ({number, getPage,currentPage}) =>
    <li className={number===currentPage?'Table_Pagination_Pages_Page pagination pageSelect':'Table_Pagination_Pages_Page pagination'} key={number} id={number} onClick={getPage}>
        {number}
    </li>
