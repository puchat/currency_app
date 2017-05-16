import React, { Component } from 'react';
import './App.css';
import DateButton from './components/DateButton.js';
import BaseCurrencySelect from './components/BaseCurrencySelect.js';
import RatesList from './components/RatesList.js';

class App extends Component {
  constructor(props) {
    super(props);

    var day = new Date(); // aktualna data
    var buttonData = [];
    for (var i = 1; i <= 7; i++) {  // wybór liczby przycisków zmiany daty
      var obj = {id: i, date: this.formatDate(day), text: this.dayToString(day)};
      buttonData.push(obj);
      day.setDate(day.getDate() - 1); // cofnięcie daty o 1 dzień do tyłu
    }
    buttonData[0].text = "Dzisiaj";
    buttonData[1].text = "Wczoraj";

    this.state = {date: buttonData[0].date, baseCurrency: "EUR", rates: [], buttonData: buttonData};
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    var url = "https://api.fixer.io/latest";
    this.getCurrencyRates(url);
  }

  handleSelectChange(new_base_curr) {
    var url = "https://api.fixer.io/" + this.state.date + "?base=" + new_base_curr;
    this.getCurrencyRates(url);
  }

  handleButtonClick(new_date) {
    var url = "https://api.fixer.io/" + new_date + "?base=" + this.state.baseCurrency;
    this.getCurrencyRates(url);
    this.setState({date: new_date});
  }

  getCurrencyRates(url) { // pobranie danych z fixer.io
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
          this.saveCurrencyRates(xmlHttp.responseText); // trzeba to zapisac w osobnej funkcji, bo AJAX dziala Asynchronicznie :D
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
  }

  saveCurrencyRates(response) {
    var tmp = JSON.parse(response);

    // konwersja zwracanego tmp.rates z pojedynczego obiektu na tablicę obiektów z polami id, symbol i rate
    var ratesArray = Object.keys(tmp.rates).map(function(key, i) { return {id: i+1, symbol: key, rate: tmp.rates[key]}; });
    ratesArray.unshift({id: 0, symbol: tmp.base, rate: 1}); // dodanie do listy wybranej (bazowej) waluty 
                                                            // (bo base currency nie ma w rates zwracanym przez fixer.io)
    this.setState({baseCurrency: tmp.base, rates: ratesArray});
  }

  formatDate(date) {
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  dayToString(date) {
    switch(date.getDay()) {
      case 0: return "Niedziela";
      case 1: return "Poniedziałek";
      case 2: return "Wtorek";
      case 3: return "Środa";
      case 4: return "Czwartek";
      case 5: return "Piątek";
      case 6: return "Sobota";
      default: return "Dzień";
    }
  }

  render() {
    return (
      <div className="container">
        <BaseCurrencySelect rates={this.state.rates} handleChange={this.handleSelectChange} />
        <RatesList rates={this.state.rates} baseCurr={this.state.baseCurrency} date={this.state.date} />
        <div className="buttonsContainer">
          {this.state.buttonData.map((b) =>
            <DateButton handleClick={this.handleButtonClick} key={b.id} day={b.text} value={b.date} />
          )}
        </div>
      </div>   
    );
  }
}

export default App;