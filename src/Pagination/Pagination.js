import React from 'react';
import "./Pg.css";
import { AuthContext } from '../Context/Context';
import { useContext } from 'react';
function Pagination({ postperpage, totalposts, paginate }) {
 const {toggle}=useContext(AuthContext) 
  const pageNumber = [];
  
  for (let i = 1; i <= Math.ceil(totalposts/ postperpage); i++) {
    pageNumber.push(i);
  }

  return (
   
      <ul className='lists'>
        {pageNumber.map((number) => (
          <li key={number} className={toggle?'Page-item':"Page-item-dark"}>
            <a
              href='!#'
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
                
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    
  );
}

export default Pagination;
