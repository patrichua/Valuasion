import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigator from './components/navigator'
import HomePage from './pages/homepage'
import GrowthRatePage from './pages/growthratepage'
import HistoricalDataPage from './pages/historicaldatapage'
import CalculatorPage from './pages/calculatorpage'
import SP500Page from './pages/sp500page'
import LearnPage from './pages/learnpage'
import './css/main.css'

function App() {
  return (
    <div>
      <main className="main">
        <Router>
          <Navigator />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/sp500" component={SP500Page} />
          <Route path="/learn" component={LearnPage} />
          <Route path="/calculator" component={CalculatorPage} />
          <Route path="/growthrate" component={GrowthRatePage} />
          <Route path="/historicaldata" component={HistoricalDataPage} />
        </Router> 
      </main>
    </div>
  );
}

export default App;
