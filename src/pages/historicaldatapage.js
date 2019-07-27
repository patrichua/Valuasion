import React from 'react'
import '../css/details.css'
import CompanyHeaderInfo from '../components/companyheaderinfo'
import ChartList from '../components/chartlist'
import HistoricalDataChart from '../components/historicaldatachart'
import DataService from '../data/dataservice'

class HistoricalDataPage extends React.Component {
    // This is a map of chart types to the description.
    chartTypes = {
        'bvps': "BVPS",
        'eps': "EPS",
        'free_cash_flow': "FCF",
        'pe_ratio': "PE Ratio",
        'pb_ratio': "PB Ratio",
        'return_on_invested_capital': "ROIC",
        'return_on_equity': "ROE",
        'revenue': "Revenue",
        'long_term_debt': "Long Term Debt",
        'basic_shares': "# of Shares"
    }

    constructor() {
        super()
        this.state = {
            company: null,
            chartData: [],
            loadingData: true
        }

        this.dataService = new DataService()
    }

    componentDidMount() {
        let self = this
        const {company} = self.props.location.state
        self.setState({company: company})
        
        self.getCharts(company.ticker)
        .then(function(chartData) {
            self.setState({chartData: chartData, loadingData: false})
        })        
    }

    render() {
        let charts = <div className="loading-charts">Loading Charts ...</div>
        if (!this.state.loadingData) {
            let chartTypes = this.chartTypes
            let listOfCharts = []
            if (this.state.chartData) {
                listOfCharts = this.state.chartData.map(function({type, data}) {
                    const chartTitle = chartTypes[type]
                    return <HistoricalDataChart key={chartTitle} title={chartTitle} data={data} />
                })
            }

            charts =  (
                <ChartList title="Historical Data" type={2} company={this.state.company}>
                    {listOfCharts}
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

    getCharts = (ticker) => {
        let self = this
        
        let chartDataTypes = []
        for (const t in this.chartTypes) {
            chartDataTypes.push(t)
        }

        return Promise.all(chartDataTypes.map(function(type) {
            return self.dataService.getHistorical(ticker, type)
        }))
        .then((historicals) => {
            let charts = []
            for (let i=0; i<chartDataTypes.length; i++) {
                let chartType = chartDataTypes[i]
                let chartData = []
                
                if (["return_on_invested_capital", "return_on_equity"].indexOf(chartType) !== -1) {
                    chartData = historicals[i].growth_rate
                }
                else {
                    chartData = historicals[i].annual
                }

                charts.push({
                    "type": chartType,
                    "data": chartData
                })
            }

            return charts
          })
    }
}

export default HistoricalDataPage
