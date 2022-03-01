import React, { Component } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { user } = isAuthenticated();
    console.log(user);

    const userLinks = () => (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart" className="nav-link">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/profile/update" className="nav-link">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );

    const userInfo = () => (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{user.name}</li>
          <li className="list-group-item">{user.email}</li>
          <li className="list-group-item">
            {user.role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );

    const purchaseHistory = () => (
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">History</li>
        </ul>
      </div>
    );
    return (
      <Layout
        title="Dashboard"
        description={`Welcome ${user.name}!`}
        className="container"
      >
        <div className="row">
          <div className="col-3">{userLinks()}</div>
          <div className="col-9">
            {userInfo()}
            {purchaseHistory()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
