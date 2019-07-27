import React from 'react'
import {Link} from 'react-router-dom'
import '../css/details.css'

class ChartList extends React.Component {
    render() {
        const { title, type } = this.props
        return (
            <div className="chart-section">
                <div className="chart-selection">
                    <Link to={{
                        pathname: '/growthrate',
                        state: {
                            company: this.props.company
                        }
                        }}>
                        <input type="radio" name="chart-type-button" className="chart-type-button" defaultChecked={type===1} />                     
                    </Link>                        
                    <Link to={{
                        pathname: '/historicaldata',
                        state: {
                            company: this.props.company
                        }
                        }}>
                        <input type="radio" name="chart-type-button" className="chart-type-button" defaultChecked={type===2} />
                    </Link>                                                       
                    <h1 className="chart-type-header">{title}</h1>
                </div> 

                <div className="chart-list"> 
                    {this.props.children}
                </div>                    
        </div>           
        )
    }
}

export default ChartList