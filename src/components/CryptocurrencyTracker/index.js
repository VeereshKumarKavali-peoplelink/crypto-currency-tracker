// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CryptocurreciesList from '../CryptocurrenciesList'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'

class CryptocurrencyTracker extends Component {
  state = {cryptocurrenciesData: [], isLoading: true}

  componentDidMount() {
    this.getCryptocurrencies()
  }

  getCryptocurrencies = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const formattedData = data.map(eachCryptocurrency => ({
      id: eachCryptocurrency.id,
      currencyLogoUrl: eachCryptocurrency.currency_logo,
      currencyName: eachCryptocurrency.currency_name,
      usdValue: eachCryptocurrency.usd_value,
      euroValue: eachCryptocurrency.euro_value,
    }))

    this.setState({cryptocurrenciesData: formattedData, isLoading: false})
  }

  renderCryptocurrenciesList = () => {
    const {cryptocurrenciesData} = this.state
    return <CryptocurreciesList cryptocurrenciesData={cryptocurrenciesData} />
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        {isLoading ? this.renderLoader() : this.renderCryptocurrenciesList()}
      </div>
    )
  }
}

export default CryptocurrencyTracker
