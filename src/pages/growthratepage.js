import React from 'react'
import '../css/details.css'
import CompanyHeaderInfo from '../components/companyheaderinfo'
import ChartList from '../components/chartlist'
import GrowthRateChart from '../components/growthratechart'

class GrowthRatePage extends React.Component {
    constructor() {
        super()
        this.state = {
            company: null,
            chartData: [],
            loadingData: true
        }
    }

    componentDidMount() {
        let self = this
        const {company} = self.props.location.state
        self.setState({company: company})
        self.setState({chartData: company.summary_growth_rate, loadingData: false})      
    }

    render() {
        let charts = <div className="loading-charts">Loading Charts ...</div>
        if (!this.state.loadingData) {
            charts =  (
                <ChartList type={1} company={this.state.company}>
                    <GrowthRateChart title="ROIC" data={this.state.chartData.roic} ref="ROICCHART" />
                    <GrowthRateChart title="ROE" data={this.state.chartData.roe} ref="ROECHART" />
                    <GrowthRateChart title="BVPS" data={this.state.chartData.bvps} ref="BVPSCHART" />
                    <GrowthRateChart title="EPS" data={this.state.chartData.eps} ref="EPSCHART" />
                    <GrowthRateChart title="FCF" data={this.state.chartData.fcf} ref="FCFCHART" />
                    <GrowthRateChart title="Revenue" data={this.state.chartData.revenue} ref="RevenueCHART" />  
                </ChartList>     
            )
        }
        
        return (
            <div>
                <CompanyHeaderInfo company={this.state.company} />
                {charts}
            </div>
        )
    }
}

export default GrowthRatePage