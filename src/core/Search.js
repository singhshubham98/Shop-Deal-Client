import React, { Component } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
class Search extends Component {
  state = {
    data: {
      categories: [],
      category: "",
      search: "",
      results: [],
      searched: false
    }
  };

  loadCategories = () => {
    getCategories().then(res => {
      if (res.error) {
        console.log(res.error);
      } else {
        this.setState({
          data: {
            ...this.state.data,
            categories: res
          }
        });
      }
    });
  };

  componentDidMount() {
    this.loadCategories();
  }

  searchData = () => {
    if (this.state.data.search) {
      list({
        search: this.state.data.search || undefined,
        category: this.state.data.category
      }).then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          this.setState({
            data: {
              ...this.state.data,
              results: res,
              searched: true
            }
          });
        }
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchData();
  };

  handleChange = name => e => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: e.target.value,
        searched: false
      }
    });
  };

  searchedProducts = (results = []) => (
    <div>
      <h4 className="mt-4 mb-4">
        {this.searchMessage(this.state.data.searched, results)}
      </h4>

      <div className="row">
        {results.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </div>
  );

  searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No product found`;
    }
  };

  searchForm = () => (
    <form onSubmit={this.handleSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-md">
          <div className="input-group-prepend">
            <select
              className="btn mr-2"
              onChange={this.handleChange("category")}
            >
              <option value="All">Pick Category</option>
              {this.state.data.categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={this.handleChange("search")}
            placeholder="Search by name"
            value={this.state.search}
            style={{ borderRadius: "5px" }}
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text" style={{ borderRadius: "5px" }}>
            Search
          </button>
        </div>
      </span>
    </form>
  );

  render() {
    return (
      <div className="row">
        <div className="container mb-3">{this.searchForm()}</div>
        <div className="container-fluid mb-3">
          {this.searchedProducts(this.state.data.results)}
        </div>
      </div>
    );
  }
}

export default Search;
