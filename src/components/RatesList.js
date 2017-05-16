import React, { Component } from 'react';

class RatesList extends Component {

  render() {
    var number = Math.floor(this.props.rates.length/2) + 1;
    return (
      <div className="ratesList">
        <p>Według kursu aktualnego na dzień&nbsp; 
          <strong>{this.props.date}</strong>, równowartość 1&nbsp;  
          <strong>{this.props.baseCurr}</strong> to:
        </p>
        <div className="wrapper">
          <div className="ratesColumn">
            <ul>
                {/* .slice(1, ...) poniżej, żeby nie wyświetlać na liście także 
                  pierwszego elementu (bazowej waluty) z rate równym 1*/}

              	{this.props.rates.slice(1, number).map((currency) => 
              		<li key={currency.id}>{currency.rate} <strong>{currency.symbol}</strong></li>
              	)}
            </ul>
          </div>

          <div className="ratesColumn">
            <ul>
                {this.props.rates.slice(number).map((currency) => 
                  <li key={currency.id}>{currency.rate} <strong>{currency.symbol}</strong></li>
                )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RatesList;
