import React from 'react'
import '../css/calculator.css'
import DataService from '../data/dataservice'

class CalculatorPage extends React.Component {
    constructor() {
        super()
        this.state = {
            growthRate: 0,
            eps: 0,
            pe: 0,
            result: 0
        }

        this.dataService = new DataService()
    }

    componentDidMount() {
        if (this.props.location.state) {
            const { factors } = this.props.location.state
        
            if (factors) {
                let eps = 0
                let growthRate = 0
                let pe = 0
    
                if (factors.eps) {
                    eps = factors.eps.toFixed(3)
                }
                
                if (factors.estimated_growth_rate) {
                    growthRate = (factors.estimated_growth_rate * 100).toFixed(2)
                }
    
                if (factors.estimate_pe) {
                    pe = factors.estimate_pe.toFixed(2)
                }
    
                this.setState({ eps: eps, growthRate: growthRate, pe: pe },
                                () => this.recalculate())
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Fair Value Calculator</h1>
                <div className="form">
                    <div className="summary">
                        <h3>This calculator allows you to calculate the fair value of a company based on:</h3>
                        
                        <ol>
                            <li>Estimated Growth Rate</li>
                            <li>Current EPS</li>
                            <li>Average PE Ratio</li>
                        </ol>

                        <p className="instruction">* Fill in the info below and click on the Calculate button</p>
                        <div className="form-row">
                            <label>Growth Rate (%)</label>
                            <div className="input">
                                <input type="number" value={this.state.growthRate} onChange={this.handleTxtGrowthRateChange} />
                                <input type="range" value={this.state.growthRate} min="0" max="100" onChange={this.handleSliderGrowthRateChange}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <label>Current EPS</label>
                            <div className="input">
                                <input type="number" value={this.state.eps} onChange={this.handleTxtEPSChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <label>PE Ratio</label>
                            <div className="input">
                                <input type="number" value={this.state.pe} onChange={this.handleTxtPEChange} />
                            </div>
                        </div>
                    </div> 
                    
                    <div className="show">
                        <ul className="result-criteria-list">
                            <li>Growth Rate: {this.state.growthRate}%</li>
                            <li>Current EPS: {this.state.eps}</li>
                            <li>PE Ratio: {this.state.pe}</li>
                        </ul>
                        <p className="calculation-result">Fair Value: ${this.state.result}</p>
                        <br />
                    </div>                      
                </div>                                
            </div>
        )
    }

    handleTxtGrowthRateChange = (event) => {
        let self = this
        const value = event.target.value
        this.setState({growthRate: value}, self.recalculate)
    }

    handleSliderGrowthRateChange = (event) => {
        let self = this
        const value = event.target.value
        this.setState({growthRate: value}, self.recalculate)
    }

    handleTxtEPSChange = (event) => {
        let self = this
        const value = event.target.value
        this.setState({eps: value}, self.recalculate)
    }

    handleTxtPEChange = (event) => {
        let self = this
        const value = event.target.value
        this.setState({pe: value}, self.recalculate)
    }

    recalculate = () => {
        let self = this
        this.dataService.getIntrinsicValue(this.state.eps, this.state.growthRate, this.state.pe)
        .then(function(result) {
            self.setState({result: result})
        })
    }
}

export default CalculatorPage