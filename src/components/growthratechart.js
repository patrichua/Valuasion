import React from 'react'
import '../css/card.css'
import Chart from "chart.js"

class GrowthRateChart extends React.Component {
    componentDidMount() {
        const chartID = this.props.title+"Chart"
        const one_year = (this.props.data["1_year"] || 0) * 100
        const five_year = (this.props.data["5_year"] || 0) * 100
        const ten_year = (this.props.data["10_year"] || 0) * 100

        this.chartSummary(chartID, {
            Labels: ["10 Year", "5 Year", "1 Year"],
            Values: [ten_year, five_year, one_year]   
        });
        
    }

    render() {
        const one_year = (this.props.data["1_year"] || 0) * 100
        const five_year = (this.props.data["5_year"] || 0) * 100
        const ten_year = (this.props.data["10_year"] || 0) * 100
        
        return (
            <div className="chart">
                <h1 className="chart-title">{this.props.title}</h1>
                <div className="chart-growth-summary">
                    <span>10 years: {parseInt(ten_year)}%</span>
                    <span>5 years: {parseInt(five_year)}%</span>
                    <span>1 year: {parseInt(one_year)}%</span>
                </div>
                <canvas id={this.props.title+"Chart"} ></canvas>
            </div>
        )
    }

    roundDataPoints = (data) => {
        for (var i=0; i<data.length; i++) {
            data[i] = parseInt(data[i]);
        }
        return data;
    }

    chartSummary = (chartID, data) => {
        var ctx = document.getElementById(chartID).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.Labels,
                datasets: [{
                    label: "Average Growth Rate",
                    data: this.roundDataPoints(data.Values),
                    backgroundColor: [
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMin: 0,
                            suggestedMax: 100,
                            fontColor: '#ffffff'
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#ffffff'
                        },
                    }]                    
                },
                title: {
                    display: true,
                    fontColor: '#ffffff'
                },
                legend: {
                    labels: {
                        fontColor: '#ffffff'
                    }
                },                 
                responsive: true
            }
        }) 
    }    
}

export default GrowthRateChart