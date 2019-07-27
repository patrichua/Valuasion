import React from 'react'
import '../css/card.css'
import Chart from "chart.js"

class HistoricalDataChart extends React.Component {
    componentDidMount() {
        const chartID = this.props.title+"Chart"
        this.graphHistoricalData(chartID, this.props.data);
        
    }

    render() {
        return (
            <div className="chart">
                <h1 className="chart-title">{this.props.title}</h1>
                <canvas id={this.props.title+"Chart"} ></canvas>
            </div>
        )
    }

    graphHistoricalData = (chartID, data) => {
        // Order the data by year.
        data.sort(function(d1, d2){
            return (d1.year > d2.year ? 1: -1);
        });

        var years = data.map(function(d){
            return d.year;
        });

        var values = data.map(function(d){
            return d.value;
        });

        var ctx = document.getElementById(chartID).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: "",
                        data: values,
                        backgroundColor: "#fff", 
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ffffff'
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#ffffff'
                        },
                    }]
                },
                responsive: true
            }
        });    
    }       
}

export default HistoricalDataChart