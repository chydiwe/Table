import React,{Component} from 'react'
import './filter.css'
export class FilterTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textSearching: ''
        }
        this.handlerClick = this.handlerClick.bind(this)
    }

    handlerClick(event) {
        this.setState({textSearching: event.target.value})
    }

    render() {
        return <div className='Table_Search Search'>
            <input placeholder='Найти(название поля:значение поля,...)' onChange={this.handlerClick} className='Table_Search_input inputStr' type="text"/>
            <input type="submit" className='Table_Search_submit InputStyleSubmit' onClick={() => this.props.filter(this.state.textSearching)} value='Найти'/>
        </div>
    }

}



