import React, { useState, useEffect } from "react";
import Currency from "./components/Currency";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [fromCurrencyType, setFromCurrencyType] = useState('INR - Indian Rupee');
  const [toCurrencyType, setToCurrencyType] = useState('USD - US Dollar');

  const [currencyOption, setCurrencyOption] = useState([]);
  const [initialRenderExecuted, setInitialRenderExecuted] = useState(false)

  const APIkey = `C1E4RIdNMGB80GSMbObhhjpgJfScws8wcQdocKSq`

  async function initialRender() {
    try {
      const response = await fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${APIkey}`);
      const jsondata = await response.json();
      const data = jsondata.data
      let countryCurrency = []
      Object.entries(data).map((entry) => {
        countryCurrency.push(entry[0] + ' - ' + entry[1]['name']) 
      })
      const filterCountrySort = countryCurrency.sort();
      setCurrencyOption(filterCountrySort);
    } catch (error) {
      console.log(error);
    }
  }
  if(!initialRenderExecuted){
    initialRender();
    setInitialRenderExecuted(true)
  }
  async function handleClick() {
    const from = fromCurrencyType.substring(0,3)
    const to = toCurrencyType.substring(0,3)

    try {
      const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${APIkey}&base_currency=${from}&currencies=${to}`)
      const data = await response.json()
      const result = data.data[to] * fromCurrency
      setToCurrency(result)
    } catch (error) {
      alert('Something Went Wrong! Please Try Again')
    }
  }

  return (
    <div className="app">
      <h1>Currency App</h1>
      <Currency
        currency={fromCurrency}
        inputChange={(e) => setFromCurrency(e.target.value)}
        option={currencyOption}
        currencyTypeChange={(e) => setFromCurrencyType(e.target.value)}
        defaultValue='INR - Indian Rupee'
        placeholder = 'Input'
      />
      <button className="calculate-btn" onClick={handleClick}>
        Calculate
      </button>
      <Currency
        currency={toCurrency}
        inputChange={(e) => {setToCurrency(e.target.value)}}
        option={currencyOption}
        currencyTypeChange={(e) => setToCurrencyType(e.target.value)}
        defaultValue='USD - US Dollar'
        placeholder = 'Output'
      />
    </div>
  );
};

export default App;
