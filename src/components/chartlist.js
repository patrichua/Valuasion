import React from 'react'
import {Link} from 'react-router-dom'
import '../css/details.css'

class ChartList extends React.Component {
    render() {
        const { type } = this.props
        return (
            <div className="chart-section">
                <div className="chart-type-selection">
                    <div>
                        <Link 
                            to={{
                                pathname: '/growthrate',
                                state: {
                                    company: this.props.company
                                }
                        }}>
                            <h2 className="chart-type-header">Growth Rate</h2>
                            <input type="radio" name="chart-type-button" className="chart-type-button" defaultChecked={type===1} />                     
                        </Link>  
                    </div>
                    <div>
                        <Link 
                            to={{
                                pathname: '/historicaldata',
                                state: {
                                    company: this.props.company
                                }}}>
                            <h2 className="chart-type-header">Historical Data</h2>
                            <input type="radio" name="chart-type-button" className="chart-type-button" defaultChecked={type===2} />
                        </Link>                           
                    </div>                 
                </div> 

                <div className="chart-list"> 
                    {this.props.children}
                </div>                    
        </div>           
        )
    }
}

export default ChartList