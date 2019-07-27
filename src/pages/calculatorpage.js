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

    render() {
        return (
            <div>
                <h1>Intrinsic Value Calculator</h1>
                <div className="summary">
                        This calculator allows you to calculate the fair value of a company based on:
                        <ol>
                            <li>Estimated Growth Rate</li>
                            <li>Current EPS</li>
                            <li>Average PE Ratio</li>
                        </ol>
                    </div>  
            
                <div className="form">
                    <p className="instruction">* Fill in the info below and click on the Calculate button</p>
                    <div className="form-row">
                        <label>Growth Rate (%) <br /> <span>*enter whole number</span></label>
                        <input type="number" className="input-text" value={this.state.growthRate} onChange={this.handleTxtGrowthRateChange} />
                    </div>
                    <div className="form-row">
                        <label>Current EPS</label><input type="number" className="input-text" value={this.state.eps} onChange={this.handleTxtEPSChange} />
                    </div>
                    <div className="form-row">
                        <label>PE Ratio</label><input type="number" className="input-text" value={this.state.pe} onChange={this.handleTxtPEChange} />
                    </div>
                    <button className="btn-calculate" onClick={this.handleCalculateBtn}>Calculate</button>
                </div>

                <div className="show">
                <ul className="result-criteria-list">
                    <li>Growth Rate: {this.state.growthRate}%</li>
                    <li>Current EPS: {this.state.eps}</li>
                    <li>PE Ratio: {this.state.pe}</li>
                </ul>    
                <p>Based on our calculation, the fair value of the company is</p>
                <p className="calculation-result">${this.state.result}</p>
                </div>                
            </div>
        )
    }

    handleTxtGrowthRateChange = (event) => {
        const value = event.target.value
        this.setState({growthRate: value})
    }

    handleTxtEPSChange = (event) => {
        const value = event.target.value
        this.setState({eps: value})
    }

    handleTxtPEChange = (event) => {
        const value = event.target.value
        this.setState({pe: value})
    }

    handleCalculateBtn = () => {
        let self = this
        this.dataService.getIntrinsicValue(this.state.eps, this.state.growthRate, this.state.pe)
        .then(function(result) {
            self.setState({result: result})
        })
    }
}

export default CalculatorPage