import AppConfig from '../app.config'

class DataService {
    api_root = AppConfig["api_url"]
    
    search = (page, ticker) => {
        let api_endpoint = ""

        if (ticker) {
            return this.getCompanyInfo(ticker)
        }
        else {
            api_endpoint = this.api_root + '/search?' + (page > 1 ? 'page=' + page : '')
            return fetch(api_endpoint)
            .then(function(response) {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(function(result) {
                if (result) {
                    return result
                }
            })
        }
    }

    sp500 = (page) => {
        let api_endpoint = ""

        api_endpoint = this.api_root + '/sp500?' + (page > 1 ? 'page=' + page : '')
        return fetch(api_endpoint)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function(result) {
            if (result) {
                return result
            }
        })
    }

    getCompanyInfo = (ticker) => {
        ticker = ticker.toUpperCase()
        let api_endpoint = this.api_root + '/company_info/' + ticker
        
        return fetch(api_endpoint)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }        
        })
        .then(function(result) {
            if (result) {
                return result
            }
        })      
    }

    getIntrinsicValue = (currentEPS, growth_rate, pe) => {
        if (currentEPS == null || growth_rate == null || pe == null) {
            return null;
        }
    
        let api_endpoint = this.api_root + '/intrinsic_value?current_eps=' + currentEPS + '&eps_growth_rate=' + growth_rate + '&pe_ratio=' + pe;
        
        return fetch(api_endpoint)
        .then(function(response) {
            if (response.ok) {
                return response.text()
            }
        })
        .then(function(result) {
            if (!isNaN(result)) {
                return parseFloat(result).toFixed(2)
            }
        })
    }    

    getStockPrice = (tickers) => {
        const strTickers = tickers.join()
        let stock_price_url = this.api_root + "/stock_quote/{tickers}"
        let api_endpoint = stock_price_url.replace("{tickers}", strTickers)
        
        return fetch(api_endpoint)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(function() {
            return null
        })
    } 
    
    getHistorical = (ticker, type) => {
        let api_endpoint = this.api_root + '/' + type + '/' + ticker + '?date_start=2010-1-1&date_stop=2099-12-31&term=annual'
        return fetch(api_endpoint)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
    }
}

export default DataService