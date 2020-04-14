import React from 'react'
import {Link} from 'react-router-dom'
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
                intrinsic_value_factors,
                sector,
                industry,
                exchange,
                discounted_cash_flow,
                last_update
            } = this.props.company
    
            let confidenceMeter = ""
            if (intrinsic_value_factors && intrinsic_value_factors.confidence_level) {
                const percent = parseInt(intrinsic_value_factors.confidence_level * 100)
                confidenceMeter =   <div>
                                        <p className="hint">We are {percent}% confident of this fair value calculation</p>
                                        <meter min="0" max="100" value={percent} className="fair-value-indicator"></meter> 
                                    </div>
            }

            return (
                <div>
                    <div className="header">
                        <div className="header-left">
                            <p className="ticker">{ticker}</p>
                            <p className="rating">{our_rating} points</p>
                        </div>    
                        <div className="header-center">
                            <h1>{company_name}</h1>
                            <h2>{sector} | {industry}</h2>
                            <h3>({exchange})</h3>
                            <h3>last updated {new Date(last_update).toDateString()}</h3>
                        </div>    
                        <div className="header-right">
                            {/*<!-- this will be the add to watchlist -->*/}  
                            <p className="price">Current Price ${stock_price?stock_price.toFixed(2):"?"}</p>
                            <p className="price">Fair Value ${intrinsic_value?intrinsic_value.toFixed(2):"?"}</p>
                            {confidenceMeter}
                            <br />
                            <Link to={{
                                pathname: '/calculator',
                                state: {
                                    factors: intrinsic_value_factors
                                }
                            }}>
                                <button className="btnAdjustFairValue">Adjust Fair Value</button>
                            </Link>                            
                        </div>
                    </div>
                    <p className="summary">
                        {summary}
                        <br />
                        Rating from alternate source: {their_rating} pt
                        <br />
                        Discounted cash flow: ${discounted_cash_flow.toFixed(2)}
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