import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Card from "../Card";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = items => (
    <React.Fragment>
      <h4>Your cart has {`${items.length}`} items.</h4>
      <hr />
      <div className="row">
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    </React.Fragment>
  );

  const Message = () => (
    <h4>
      Your cart is empty. <hr />
      <br /> <Link to="/shop">Continue shopping</Link>
    </h4>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-7">
          {items.length > 0 ? showItems(items) : Message()}
        </div>
        <div className="col-5">
          <h3 className="mb-4">Your cart summary</h3>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
