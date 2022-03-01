import React, { Component } from "react";
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./FixedPrice";
import Card from "./Card";
import Search from "./Search";

class Shop extends Component {
  state = {
    categories: [],
    error: false,
    newFilters: {
      filters: {
        category: [],
        price: []
      }
    },
    limit: 8,
    skip: 0,
    size: 0,
    filteredResult: []
  };

  init = () => {
    getCategories().then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        this.setState({
          categories: data
        });
      }
    });
  };

  loadFilteredResult = newFilters => {
    getFilteredProducts(this.state.skip, this.state.limit, newFilters).then(
      data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          this.setState({
            filteredResult: data.data,
            size: data.size,
            skip: 0
          });
        }
      }
    );
  };

  loadMore = () => {
    let toSkip = this.state.skip + this.state.limit;
    getFilteredProducts(
      toSkip,
      this.state.limit,
      this.state.newFilters.filters
    ).then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        this.setState({
          filteredResult: [...this.state.filteredResult, ...data.data],
          size: data.size,
          skip: toSkip
        });
      }
    });
  };

  loadMoreButton = () => {
    const { size, limit } = this.state;
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={this.loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  componentDidMount() {
    this.loadFilteredResult(
      this.state.limit,
      this.state.skip,
      this.state.newFilters
    );
    this.init();
  }

  handleFilters = (filters, filterBy) => {
    const newFilters = { ...this.state.newFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValue = this.handlePrice(filters);

      newFilters.filters[filterBy] = priceValue;
    }
    this.loadFilteredResult(this.state.newFilters.filters);
    this.setState({
      newFilters
    });
  };

  handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  render() {
    return (
      <Layout
        title="Shop"
        description={"Search and find books of you choice"}
        className="container-fluid"
      >
        <Search />
        <div className="row">
          <div className="col-3">
            <h4>Filter by category</h4>
            <ul>
              <Checkbox
                categories={this.state.categories}
                handleFilters={filters =>
                  this.handleFilters(filters, "category")
                }
              />
            </ul>
            <h4>Filter by price range</h4>
            <RadioBox
              prices={prices}
              handleFilters={filters => this.handleFilters(filters, "price")}
            />
          </div>
          <div className="col-9">
            <h2 className="mb-3">Products</h2>
            <div className="row">
              {this.state.filteredResult.map((product, i) => (
                <Card product={product} key={i} />
              ))}
            </div>
            {this.loadMoreButton()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Shop;
