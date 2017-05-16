import React, { Component } from 'react';

class BaseCurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'EUR'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}, function() {
    	this.props.handleChange(this.state.value);	// wyslanie info o nowej bazowej walucie do App
    });
  }

  render() {
    return (
        <label>
          Wybierz bazową walutę:&nbsp;
          <select value={this.state.value} onChange={this.handleChange}>

          	{this.props.rates.map((currency) =>
          		<option key={currency.id} value={currency.symbol}>{currency.symbol}</option>
          	)}

          </select>
        </label>
    );
  }
}

export default BaseCurrencySelect;
