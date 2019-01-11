import React, {Component} from 'react';
import './table.css';
import {Tbody} from "../../components/tbody/tbody";
import {Thead} from "../../components/thead/thead";
import {FilterTable} from "../../components/filterForTable/filter";
import {Info} from "../../components/info-block/info-block";
import {Pagination} from "../../components/ClientPagination/pagintation";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: [],
            sortStatus: ['arrowDown', 'arrowDown', 'arrowDown', 'arrowDown', 'arrowDown'],
            info: null,
            currentPage: 1,
            elPerPage: 50
        }
        this.sortTable = this.sortTable.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.filter = this.filter.bind(this)
        this.getPage = this.getPage.bind(this)
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
            newSortState[key] = 'arrowDown'
        }
        this.setState({
            currentData: sortArr,
            sortStatus: newSortState,
            info: null
        })
    }

    componentDidMount() {
        fetch(`http://www.filltext.com/${this.props.location.search}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(response => {
                    if (response.status === 200) {
                        response.json().then((data) =>
                            this.setState({
                                currentData: data,
                            }))

                    }
                    else alert('Ошибка соединения сервером')

                }
            )
    }

    filter(str) {
        if (str !== null) {
            this.setState({
                currentPage: 1,
                info: null
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
            currentData: this.state.data,
            data: []
        })
    }

    showInfo(key) {
        this.setState({
            info: this.state.elPerPage * (this.state.currentPage - 1) + key
        })
    }

    getPage(e) {
        this.setState({currentPage: Number(e.target.id)})
    }

    render() {
        const {currentPage, currentData, sortStatus, elPerPage} = this.state
        return (
            <div className="App">
                {this.state.currentData.length ? <div className='Table'>
                    <FilterTable filter={this.filter}/>
                    <table className='tableTextBorder'>
                        <Thead sort={this.sortTable} data={currentData[0]}
                               sortStatus={sortStatus}/>
                        <Tbody currentPage={currentPage} data={currentData} elPerPage={elPerPage}
                               showInfo={this.showInfo}/>
                    </table>
                    <div className="Table_Pagination">{
                        <Pagination currentPage={currentPage} elPerPage={elPerPage}
                                    getPage={this.getPage} dataLength={this.state.currentData.length}/>
                    }</div>
                    {this.state.info === null ? null : <Info info={currentData[this.state.info]}/>}
                </div> : <div className="loader"></div>}


            </div>
        );
    }
}


export default Table;
