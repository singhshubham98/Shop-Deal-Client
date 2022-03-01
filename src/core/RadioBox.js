import React, { Component } from "react";

class RadioBox extends Component {
  state = {
    value: 0
  };
  handleChange = e => {
    this.props.handleFilters(e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  render() {
    return this.props.prices.map((p, i) => (
      <div key={i}>
        <input
          onChange={this.handleChange}
          type="radio"
          name={p}
          value={p._id}
          className="mr-2 ml-4"
        />
        <label className="form-check-label">{p.name}</label>
      </div>
    ));
  }
}

export default RadioBox;
