import React, { Component } from 'react';

class DateButton extends Component {
  constructor(props) {
  	super(props);
  	this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.handleClick(event.currentTarget.value);	// wyslanie info o nowej dacie do App
  }
  
  render() {
    return (
      <button onClick={this.handleClick} value={this.props.value}>
        <strong>{this.props.day}</strong><br/>{this.props.value}
      </button>
    );
  }
}

export default DateButton;
