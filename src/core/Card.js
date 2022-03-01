import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import "../styles.css";
import moment from "moment";
import { addItem, updateProduct, removeItem } from "./cart/cartHelpers";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showRemoveProductButton = false,
  description = false,
  cartUpdate = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`}>
        <button className="btn outline mt-2 mb-2">VIEW</button>
      </Link>
    );

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) =>
    showAddToCartButton && (
      <button onClick={addToCart} className="btn outline m-2">
        ADD TO CART
      </button>
    );

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
          }}
          className="btn outline-danger m-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = (quantity) =>
    quantity > 0 ? (
      <span className="badge badge-primary badge-pill ml-3">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill ml-3">Out of Stock</span>
    );

  const handleChangeDecrement = (productId, Count) => {
    setCount(Count < 1 ? 1 : Count - 1);
    if (Count >= 1) {
      updateProduct(productId, Count - 1);
    }
  };

  const handleChangeIncrement = (productId, Count) => {
    setCount(Count + 1);
    if (Count >= 1) {
      updateProduct(productId, Count + 1);
    }
  };

  const showCartUpdateOptions = (cartUpdate) =>
    cartUpdate && (
      <div>
        <div className="input-group mb-3">
          <button className="incrementDecrementButton">
            <FontAwesomeIcon
              icon={faMinus}
              onClick={() => handleChangeDecrement(product._id, count)}
            />
          </button>
          <div className="countDisplay">{count}</div>
          <button
            className="incrementDecrementButton"
            onClick={() => handleChangeIncrement(product._id, count)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    );
  return (
    <React.Fragment>
      {shouldRedirect(redirect)}
      <div className="mb-3 mr-3" style={{ paddingLeft: 0 }}>
        <div className="card h-100" style={{ width: "13rem", border: "none" }}>
          <ShowImage
            className="card-img-top"
            item={product}
            url="product"
            minHeight="200px"
            maxHeight="200px"
          />
          <div className="card-block">
            <h6 className="card-title">{product.name}</h6>
            {description && (
              <p className="lead mt-2">
                {product.description.substring(0, 100)}
              </p>
            )}

            <p className="black-9">
              &#8377; {product.price} {showStock(product.quantity)}
            </p>
            <p className="black-8">Category: {product.category.name}</p>
            <p className="black-7">
              Added on {moment(product.createdAt).fromNow()}
            </p>

            {showViewButton(showViewProductButton)}
            {showAddToCart(showAddToCartButton)}
            {showRemoveButton(showRemoveProductButton)}
            {showCartUpdateOptions(cartUpdate)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
