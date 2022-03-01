import React, { Component } from "react";
import { read, listRelatedProduct } from "./apiCore";
import { addItem } from "./cart/cartHelpers";
import Card from "./Card";
import { Redirect } from "react-router-dom";
import "../styles.css";
import ShowImage from "./ShowImage";
import moment from "moment";

class Product extends Component {
  state = {
    product: {},
    relatedProducts: [],
    error: false,
    redirect: false
  };

  addToCart = () => {
    addItem(this.state.product, () => {
      this.setState({
        redirect: true
      });
    });
  };

  shouldRedirect = () => {
    return <Redirect to="/cart" />;
  };

  showStock = quantity =>
    quantity > 0 ? (
      <span className="badge badge-primary badge-pill ml-3">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill ml-3">Out of Stock</span>
    );

  showAddToCartButton = () => (
    <button className="btn outline m-2" onClick={this.addToCart}>
      ADD TO CART
    </button>
  );

  loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        this.setState({
          product: data
        });
        listRelatedProduct(data._id).then(data => {
          if (data.error) {
            this.setState({
              error: data.error
            });
          } else {
            this.setState({
              relatedProducts: data
            });
          }
        });
      }
    });
  };

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.loadSingleProduct(productId);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.productId !== this.props.match.params.productId
    ) {
      const productId = this.props.match.params.productId;
      this.loadSingleProduct(productId);
    }
  }

  render() {
    const { product } = this.state;

    return this.state.redirect ? (
      this.shouldRedirect()
    ) : (
      <div className="container" style={{ paddingTop: "15vh" }}>
        <div className="row">
          <div className="col-7">
            <div className="offset-2">
              {product && (
                <ShowImage
                  item={product}
                  className="img-responsive"
                  url="product"
                  minHeight="50vmin"
                  maxHeight="100%"
                />
              )}
            </div>
          </div>
          <div className="col-5 mt-5">
            <h4 className="text-muted">{product.name}</h4>
            <hr />
            <p className="black-9">
              &#8377; {product.price} {this.showStock(product.quantity)}
            </p>

            <p className="black-8">{product.description}</p>
            {/* <p className="black-8">Category: {product.category.name}</p> */}
            <p className="black-7">Quantity: {product.quantity}</p>
            <p className="black-6">
              Added on {moment(product.createdAt).fromNow()}
            </p>
            {this.showAddToCartButton()}
          </div>
        </div>
        <hr />
        <div className="mt-4">
          <h4>Related Products</h4>
          <div className="row mt-3">
            {this.state.relatedProducts.map((p, i) => (
              <div className="mb-4" key={i}>
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
