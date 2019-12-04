import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Markup } from 'interweave'

const CoinInfo = props => {
  const { coinID } = useParams()
  const currentCoin = props.coinData.find(coin => coin.id === coinID)
  const [coinDetails, setCoinDetails] = useState({
    genesis_date: '',
    description: {
      en: '',
    },
    links: {
      homepage: [''],
    },
  })

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${currentCoin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`
      )
      .then(res => {
        console.log(res.data)
        setCoinDetails(res.data)
      })
      .catch(err => console.log(err))
  }, [currentCoin])

  return (
    <div>
      <img
        className='coin__logo'
        src={currentCoin.image}
        alt={currentCoin.name}
      />
      <h1>{currentCoin.name}</h1>
      <h2>Market Cap Rank: {currentCoin.market_cap_rank}</h2>
      <h3>Current Price: {currentCoin.current_price}</h3>
      <p>Date Created: {coinDetails.genesis_date}</p>
      <div><Markup content={coinDetails.description.en} /></div>
      <a href={coinDetails.links.homepage[0]}>Learn More</a>
    </div>
  )
}
export default CoinInfo
