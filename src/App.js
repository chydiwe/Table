import React, {Component} from 'react';
import './App.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: [],
            sortStatus: ['arrowDown', 'arrowDown', 'arrowDown', 'arrowDown', 'arrowDown'],
            info: null,
            currentPage: 1,
        }
        this.sortTable = this.sortTable.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.filter = this.filter.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    sortTable(item, key) {
        let sortArr = this.state.currentData, newSortState = this.state.sortStatus;
        if (newSortState[key] === 'arrowDown') {
            sortArr.sort((a, b) => {
                if (a[item] > b[item])
                    return 1
            })
            newSortState = ['arrowDown', 'arrowDown', 'arrowDown', 'arrowDown', 'arrowDown']
            newSortState[key] = 'arrowUp'
        }
        else {
            sortArr.reverse()
            newSortState = ['arrowDown', 'arrowDown', 'arrowDown', 'arrowDown', 'arrowDown']
            newSortState[key] = 'arrowDown'
        }
        this.setState({
            currentData: sortArr,
            sortStatus: newSortState
        })
    }

    componentDidMount() {
        fetch(`http://www.filltext.com/${this.props.location.search}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(response => {
                    if (response.status === 200) {
                        response.json().then((data) =>
                            this.setState({
                                currentData: data,
                                data: data,
                                isLoad: true
                            }))

                    }
                    else alert('Ошибка соединения сервером')

                }
            )
    }

    filter(str) {
        if (str !== '') {
            this.setState({
                currentPage: 1,
                info:null
            })
            let arr = str.split(','), data;
            this.state.data ? data = this.state.data : data = this.state.currentData
            arr = arr.map((item) => item.split(':'));
            arr = data.filter(obj => {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].length === 2) {
                        if (obj[arr[i][0]] !== undefined && obj[arr[i][0]].toString() === arr[i][1])
                            return true;
                    }

                }
            })
            if (arr.length !== 0) this.setState({
                currentData: arr,
                data: data
            })
            else alert('Не найдено')

        }
        else this.setState({
            currentData: this.state.data
        })
    }

    showInfo(key) {
        this.setState({
            info: 50 * (this.state.currentPage - 1) + key
        })
    }

    handleClick(e) {
        this.setState({currentPage: Number(e.target.id)})
    }

    render() {//Клиентская пагинация
        console.log(this.state.currentData)
        const elPerPage = 50,
            indexOfLast = this.state.currentPage * elPerPage,
            indexOfFirst = indexOfLast - elPerPage,
            currentElements = this.state.currentData.slice(indexOfFirst, indexOfLast),
            pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.currentData.length / elPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            );
        });//
        return (
            <div className="App">
        {this.state.currentData.length ? <div className='Table'>
            <FilterTable filter={this.filter}/>
            <table>
                <Thead sort={this.sortTable} data={this.state.currentData[0]}
                       sortStatus={this.state.sortStatus}/>
                <Tbody data={currentElements} showInfo={this.showInfo}/>

            </table>
            <div className="Pages">{renderPageNumbers}</div>
            {this.state.info === null ? null : <Info info={this.state.currentData[this.state.info]}/>}
        </div>:<div className="loader"></div>}


    </div>
        );
    }
}

class FilterTable extends Component {
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
        return <div className='Search'>
            <input placeholder='Найти(название поля:значение поля)' onChange={this.handlerClick} className='itemSize' type="text"/>
            <input type="submit" onClick={() => this.props.filter(this.state.textSearching)} value='Найти'/>
        </div>
    }

}

const Thead = ({sort, data, sortStatus}) => {
    const property = Object.keys(data);
    return (
        <thead>
        <tr className='header'>
            {property.map((item, index) => {
                if (index < 5)
                    return <td key={index} onClick={() => sort(item, index)}>{item}
                        <div className={sortStatus[index]}></div>
                    </td>
            })}
        </tr>
        </thead>)
}


const Tbody = ({data, showInfo}) =>
    <tbody>
    {data.map((item, index) =>
        <tr key={index} onClick={() => showInfo(index)}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
        </tr>)}
    </tbody>

const Info = ({info}) => {
    return <div className='info'>
        <p>Выбран пользователь:  <b>{`${info.firstName} ${info.lastName}`}</b></p>
        <p>Описание</p>
        <textarea readOnly value={info.description}/>
        <p>Адрес проживания:<b>{info.address.streetAddress}</b></p>
        <p>Город:<b>{info.address.city}</b> </p>
        <p>Провинция/штат: <b>{info.address.state}</b></p>
        <p>Индекс:<b>{info.address.zip}</b></p>
    </div>

}

export default Table;
