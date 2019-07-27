import React from 'react'
import '../css/searchbar.css'
import filter from '../images/filter.png'
import search from '../images/search.png'
import SummaryCardList from '../components/summarycardlist'
import DataService from '../data/dataservice'

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            "ticker": "",
            companies: [],
            page: 1
        }

        this.dataService = new DataService()
    }

    componentDidMount() {
        // We're going to fetch some data from the server.
        this.handleSearch()
    }

    render() {
        return (
            <div>
                <div className="search-bar">
                    <input 
                        type="text" 
                        className="txt-search-ticker" 
                        value={this.state.ticker}
                        onChange={this.handleTxtSearchTickerChange}
                        onKeyDown={this.keyPress}
                        placeholder="type in the ticker symbol" 
                    />
                    <div className="search-bar-actions">
                        <img className="search" src={search} alt="filter" onClick={this.handleSearch} />
                        <img className="filter" src={filter} alt="filter"  onClick={this.handleFilter} />
                    </div>           
                </div>
                <SummaryCardList companies={this.state.companies} />
                <br />
                <button className="btn-get-more" onClick={this.handleBtnGetMore}>GET MORE</button>
            </div>
        )
    }

    handleTxtSearchTickerChange = (event) => {
        const value = event.target.value;
        this.setState((prevState) => ({ "ticker": value}))
    }

    handleSearch = () => {
        let self = this
        let ticker = self.state.ticker
        let page = self.state.page
        if (ticker) {
            self.dataService.search(page, ticker)
            .then(function(result) {
                self.setState((prevState) => ({ "companies": [result]}))
                self.getStockPrice([result])
                .then(function(companies) {
                    self.setState((prevState) => ({ "companies": companies}))
                })
            })
            .catch(function() {
                self.handleSearchNotFound();
            })
        }
        else {
            self.dataService.search(page)
            .then(function(result) {
                self.getStockPrice(result)
                .then(function(companies) {
                    self.setState((prevState) => ({ "companies": prevState.companies.concat(companies)}))
                })
            })
            .catch(function() {
                self.handleSearchNotFound();
            })
        }
    }

    handleBtnGetMore = () => {
        let self = this
        self.setState((prevState) => ({page: prevState.page + 1}),
            () => {
                self.handleSearch()                
        })
    }

    getStockPrice = (companies) => {
        let lookup = {}

        let tickers = companies.map(function(company) {
            lookup[company.ticker] = company
            return company.ticker
        })

        return this.dataService.getStockPrice(tickers)
        .then(function(result) {
            for (let i=0; i < result.length; i++) {
                let item = result[i]
                lookup[item.symbol]["stock_price"] = item.price
            }

            return companies
        })
    }

    handleFilter = () => {
        console.log("this will do something eventually")
    }

    keyPress = (e) => {
        if(e.keyCode === 13){
            this.handleSearch();
        }
     }    

     handleSearchNotFound = () => {
        alert("We apologize. We can't seem to find that ticker symbol in our database.")
    }
}

export default HomePage