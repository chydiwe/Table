import React from 'react'
import './info-block.css'


export const Info = ({info}) => {
    return <div className='Table_info Info'>
        <p>Выбран пользователь:  <b>{`${info.firstName} ${info.lastName}`}</b></p>
        <p>Описание</p>
        <textarea className='Table_info_textArea textAreaStyle' readOnly value={info.description}/>
        <p>Адрес проживания:<b>{info.address.streetAddress}</b></p>
        <p>Город:<b>{info.address.city}</b> </p>
        <p>Провинция/штат: <b>{info.address.state}</b></p>
        <p>Индекс:<b>{info.address.zip}</b></p>
    </div>

}