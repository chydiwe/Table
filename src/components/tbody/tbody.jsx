import React,{Component} from 'react'
import './tbody.css'
export class Tbody extends Component {

    render() {
        const indexOfLast = this.props.currentPage * this.props.elPerPage,
            indexOfFirst = indexOfLast - this.props.elPerPage,
            currentElements = this.props.data.slice(indexOfFirst, indexOfLast)
        const {showInfo} = this.props;
        return (
            <tbody className='Table_Tbody StyleForTr'>
            {currentElements.map((item, index) =>
                <tr className='Table_Tbody_tr StyleForTd' key={index} onClick={() => showInfo(index)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>)}
            </tbody>
        );
    }

}
