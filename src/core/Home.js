import React, { Component } from "react";
import { getProducts } from "./apiCore";
import "../style/home.css";
import Card from "./Card";
import Layout from "./Layout";

class Home extends Component {
  state = {
    productBySell: [],
    productByArrival: [],
    error: false
  };

  loadProductBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        this.setState({
          productBySell: data
        });
      }
    });
  };

  loadProductByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        this.setState({
          productByArrival: data
        });
      }
    });
  };

  componentDidMount() {
    this.loadProductBySell();
    this.loadProductByArrival();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.loadProductBySell();
      this.loadProductByArrival();
    }
  }
  render() {
    return (
      <Layout
        title="Home"
        description="Welcome to Shopdeal"
        className="container-fluid"
      >
        <h2 className="mb-4 ml-4">New Arrivals</h2>
        <div className="row ml-4">
          {this.state.productByArrival.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>

        <h2 className="mb-4 ml-4">Best Sellers</h2>
        <div className="row ml-4">
          {this.state.productBySell.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </Layout>
    );
  }
}

export default Home;
