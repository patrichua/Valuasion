import React from 'react'
import '../css/details.css'

class CompanyHeaderInfo extends React.Component {
    render() {
        if (this.props.company) {
            const {
                ticker,
                company_name,
                summary,
                our_rating,
                their_rating,
                stock_price,
                intrinsic_value,
                sector,
                industry,
                exchange,
                discounted_cash_flow
            } = this.props.company
    
            return (
                <div>
                    <div className="header">
                        <div className="header-left">
                            <p className="ticker">{ticker}</p>
                            <p className="rating">{our_rating} pt</p>
                            <p className="price">Current Price ${stock_price?stock_price.toFixed(2):"?"}</p>
                            <p className="price">Fair Value ${intrinsic_value?intrinsic_value.toFixed(2):"?"}</p>
                        </div>    
                        <div className="header-center">
                            <h1>{company_name}</h1>
                            <h2>{sector} | {industry}</h2>
                            <h3>({exchange})</h3>
                        </div>    
                        <div className="header-right">{/*<!-- this will be the add to watchlist -->*/}  </div>
                    </div>
                    <p className="summary">
                        {summary}
                        <br />
                        Other rating: {their_rating} pt
                        <br />
                        Discounted cash flow: {discounted_cash_flow}
                    </p>
                </div>            
            )            
        }
        else {
            return <div>

            </div>
        }
    }
}

export default CompanyHeaderInfo