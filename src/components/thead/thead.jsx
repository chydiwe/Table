import React from 'react'
import './thead.css'
export const Thead = ({sort, data, sortStatus}) => {
    const property = Object.keys(data);
    return (
        <thead className='Table_Thead HeaderStyle'>
        <tr className='Table_Thead_tr StyleForTd'>
            {property.map((item, index) => {
                if (index < 5)
                    return <td key={index} onClick={() => sort(item, index)}>{item}
                        <div className={sortStatus[index]}></div>
                    </td>
            })}
        </tr>
        </thead>)
}
