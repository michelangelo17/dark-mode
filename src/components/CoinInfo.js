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
    currentCoin &&
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${currentCoin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`
        )
        .then(res => setCoinDetails(res.data))
        .catch(err => console.log(err))
  }, [currentCoin])

  return (
    <div className='content'>
      {currentCoin && (
        <>
          <h1 className='info__content'>{currentCoin.name}</h1>
          <img
            className='coin__logo'
            src={currentCoin.image}
            alt={currentCoin.name}
          />
          <h2 className='info__content'>
            Market Cap Rank: #{currentCoin.market_cap_rank}
          </h2>
          <h3 className='info__content'>
            Current Price: ${currentCoin.current_price}
          </h3>
        </>
      )}
      <h4 className='info__content'>
        Date Created:{' '}
        {coinDetails.genesis_date ? coinDetails.genesis_date : 'unknown'}
      </h4>
      <div>
        <Markup content={coinDetails.description.en} />
      </div>
      <a className='learn__more' href={coinDetails.links.homepage[0]}>
        Click Here to Learn More
      </a>
    </div>
  )
}
export default CoinInfo
