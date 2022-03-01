import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import "../style/menu.css";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cart/cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#d65611" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <React.Fragment>
      <nav className="navbar fixed-top navbar-expand-md custom-navbar navDiv">
        <Link to="/" className="navbar-brand">
          <img
            className="img-responsive"
            src={require("../image/favicon.ico")}
            style={{ maxHeight: "40px", maxWidth: "40px" }}
            alt="logo"
          />
          Shopdeal
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <Link className="nav-link" to="/" style={isActive(history, "/")}>
              Home
            </Link>
            <Link
              className="nav-link"
              to="/shop"
              style={isActive(history, "/shop")}
            >
              Shop
            </Link>

            <Link
              className="nav-link"
              to="/cart"
              style={isActive(history, "/cart")}
            >
              <FontAwesomeIcon icon={faShoppingCart} />{" "}
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>

            {isAuthenticated() && isAuthenticated().user.role === 0 ? (
              <Link
                className="nav-link"
                to="/user/dashboard"
                style={isActive(history, "/user/dashboard")}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                className="nav-link"
                to="/admin/dashboard"
                style={isActive(history, "/admin/dashboard")}
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated() && (
              <React.Fragment>
                <Link
                  className="nav-link"
                  to="/signup"
                  style={isActive(history, "/signup")}
                >
                  Signup <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
                <Link
                  className="nav-link"
                  to="/signin"
                  style={isActive(history, "/signin")}
                >
                  Signin <FontAwesomeIcon icon={faSignInAlt} />
                </Link>
              </React.Fragment>
            )}
            {isAuthenticated() && (
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Sign out <FontAwesomeIcon icon={faSignInAlt} />
              </span>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(Menu);
