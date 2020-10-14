import React from 'react'
import '../css/searchbar.css'
import filter from '../images/filter.svg'
import search from '../images/search.svg'
import SummaryCardList from '../components/summarycardlist'
import DataService from '../data/dataservice'

class SP500Page extends React.Component {
    constructor() {
        super()
        this.state = {
            "ticker": "",
            companies: [],
            page: 1,
            loadingData: true
        }

        this.dataService = new DataService()
        this.isComponentMounted = false
    }

    componentDidMount() {
        this.isComponentMounted = true
        // We're going to fetch some data from the server.
        this.handleSearch()
    }

    componentWillUnmount() {
        this.isComponentMounted = false
    }

    render() {
        let content = ""
        let btnGetMore = ""
        if (this.state.loadingData) {
            content = <div className="loading-charts">Loading Data ...</div>
        }        
        else {
            btnGetMore = <button className="btn-get-more" onClick={this.handleBtnGetMore}>GET MORE</button>
        }
        
        if (this.state.ticker.trim() !== "") {
            // If they typed in a ticker, then don't show the Get More button.
            btnGetMore = ""
        }

        content =  
            <div>
                <SummaryCardList companies={this.state.companies} />
                <br />
                {content}
                {btnGetMore}
            </div>

        return (
            content
        )
    }

    handleSearch = () => {
        let self = this
        self.setState({ loadingData: true})

        let ticker = self.state.ticker
        let page = self.state.page
        if (ticker) {
            self.dataService.search(page, ticker)
            .then(function(result) {
                if (self.isComponentMounted) {
                    self.setState((prevState) => ({ "companies": [result], loadingData: false}))
                }
                
                self.getStockPrice([result])
                .then(function(companies) {
                    if (self.isComponentMounted) {
                        self.setState((prevState) => ({ "companies": companies, loadingData: false}))
                    }
                })
            })
            .catch(function() {
                self.setState({ "companies": [], loadingData: false})
                self.handleSearchNotFound();
            })
        }
        else {
            self.dataService.sp500(page)
            .then(function(result) {
                self.getStockPrice(result)
                .then(function(companies) {
                    if (self.isComponentMounted) {
                        self.setState((prevState) => ({ "companies": prevState.companies.concat(companies), loadingData: false}))
                    }
                })
                .catch(function() {
                    if (self.isComponentMounted) {
                        self.setState((prevState) => ({ "companies": result}))
                    }
                })
            })
            .catch(function() {
                self.setState({ "companies": [], loadingData: false})
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
            if (!result) {
                return []
            }

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

export default SP500Page