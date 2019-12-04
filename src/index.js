import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Charts from './components/Charts'
import Navbar from './components/Navbar'

import './styles.scss'
import CoinInfo from './components/CoinInfo'

const App = () => {
  const [coinData, setCoinData] = useState([])

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
      )
      .then(res => {
        console.log(res.data)
        setCoinData(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Route exact path='/' render={() => <Charts coinData={coinData} />} />
        <Route
          exact
          path='/:coinID'
          render={() => <CoinInfo coinData={coinData} />}
        />
      </div>
    </Router>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
