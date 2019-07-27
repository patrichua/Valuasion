import React from 'react'
import SummaryCard from './summarycard'
import '../css/card.css'

class SummaryCardList extends React.Component {
    render() {
        let cards = this.props.companies.map(function(company) {
            return (
                <SummaryCard key={company.ticker} companyInfo={company} />
            )
        })

        return (
            <div className="result-list"> 
                {cards}
            </div>          
        )
    }
}

export default SummaryCardList