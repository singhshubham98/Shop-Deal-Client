import React, { Component } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "./apiAdmin";
import { Link } from "react-router-dom";

class AddCategory extends Component {
  state = {
    name: "",
    error: false,
    success: false
  };

  handleChange = e => {
    this.setState({
      error: "",
      name: e.target.value
    });
  };

  showSuccess = () => {
    if (this.state.success) {
      return (
        <div className="alert alert-info">
          <h6>Category {this.state.name} is created.</h6>
        </div>
      );
    }
  };

  showError = () => {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          <h6 className="text-danger">Category should be unique.</h6>
        </div>
      );
    }
  };

  goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      error: "",
      success: false
    });
    const { user, token } = isAuthenticated();
    const { name } = this.state;
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        this.setState({
          error: true
        });
      } else {
        this.setState({
          error: "",
          success: true
        });
      }
    });
  };
  render() {
    const { user } = isAuthenticated();
    return (
      <Layout
        title="Add a new category"
        description={`${user.name}, ready to add a new category?`}
      >
        <div className="row">
          <div className="col-md-6 offset-md-2">
            {this.showSuccess()}
            {this.showError()}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.name}
                  autoFocus
                  required
                />
              </div>
              <button className="btn btn-outline-primary">
                Create Category
              </button>
            </form>
            {this.goBack()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default AddCategory;
