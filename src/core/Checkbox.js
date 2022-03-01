import React, { Component } from "react";

class Checkbox extends Component {
  state = {
    checked: []
  };

  handleToggle = c => () => {
    const currentCategoryId = this.state.checked.indexOf(c);
    const newCheckedCategoryId = [...this.state.checked];

    //if currently checked was not already in checked state > push
    // else pull/take off

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    this.setState({
      checked: newCheckedCategoryId
    });
    this.props.handleFilters(newCheckedCategoryId);
  };

  render() {
    return this.props.categories.map((c, i) => (
      <li key={i} className="list-unstyled">
        <input
          onChange={this.handleToggle(c._id)}
          type="checkbox"
          value={this.state.checked.indexOf(c._id === -1)}
          className="form-check-input"
        />
        <label className="form-check-label">{c.name}</label>
      </li>
    ));
  }
}

export default Checkbox;
