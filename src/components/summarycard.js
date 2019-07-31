import React from 'react'
import {Link} from 'react-router-dom'
import flameIcon from '../images/flame.png'
import '../css/card.css'

class SummaryCard extends React.Component {
    render() {
        let companyInfo = this.props.companyInfo

        let intrinsicValueDisplay = companyInfo.intrinsic_value
        if (!intrinsicValueDisplay) {
            intrinsicValueDisplay = <span className="unknown-value">?</span>
        }
        else {
            intrinsicValueDisplay = <span>${intrinsicValueDisplay.toFixed(2)}</span>
        }

        let stockPriceDisplay = companyInfo.stock_price
        if (!stockPriceDisplay) {
            stockPriceDisplay = <span className="unknown-value">?</span>
        }
        else {
            stockPriceDisplay = <span>${stockPriceDisplay.toFixed(2)}</span>
        }

        const shouldShowHotStock = (companyInfo.intrinsic_value && companyInfo.stock_price) && (companyInfo.intrinsic_value||0) > ((companyInfo.stock_price||0)*2)

        return (
            <div className="result-card">
                <div className="result-card-row">
                <div className="result-card-top-left">
                    <p className="result-card-ticker">{companyInfo.ticker}</p>
                    <p className="result-card-company-name">{companyInfo.company_name.substring(0, 20)}</p>
                </div>
                <div className="result-card-top-right">
                    {/*<!--<a class="add-to-watch-list-plus-sign">+</a> <a href="#" class="add-to-watch-list">ADD TO WATCH LIST</a>-->*/}
                </div>            
                </div>
                <div className="result-card-row">
                <div className="result-card-rating">
                    <Link to={{
                        pathname: '/growthrate',
                        state: {
                            company: this.props.companyInfo
                        }
                        }}>
                        <span className="result-card-rating-point">{companyInfo.our_rating}</span> pt
                        <p className="result-card-more-info">
                            tap for more info
                        </p>                        
                    </Link>
                </div>
                </div>
                <div className="result-card-row">
                <div className="result-card-bottom-left">
                    Current Price
                    <br />
                    {stockPriceDisplay}
                    {shouldShowHotStock ? <img src={flameIcon} alt="flaming hot stock" /> : <span></span>}
                </div>
                <div className="result-card-bottom-right">
                    Fair Value
                    <br />
                    {intrinsicValueDisplay}
                </div>   
                </div>                    
            </div>            
        )
    }
}

export default SummaryCard