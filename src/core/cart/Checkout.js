import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/index";
import { Link } from "react-router-dom";
import { getBraintreeClientToken, processPayment } from "../apiCore";
import { emptyCart } from "./cartHelpers";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (id, token) => {
    getBraintreeClientToken(id, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
    // eslint-disable-next-line
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const buy = () => {
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod

    let nonce;
    data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        // when you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        //  and also total to be charged

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((res) => {
            setData({ ...data, success: res.success });
            emptyCart(() => {
              console.log("Payment success and empty cart");
            });
            // empty cart
            // create order
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
              googlePay: {
                googlePayVersion: 2,
                merchantId: process.env.BRAINTREE_MERCHANT_ID,
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPrice: getTotal(products),
                  currencyCode: "INR",
                },
                cardRequirements: {
                  // We recommend collecting and passing billing address information with all Google Pay transactions as a best practice.
                  billingAddressRequired: true,
                },
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful.
    </div>
  );
  return (
    <div>
      <h3>Total: &#8377;{getTotal()}</h3>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
