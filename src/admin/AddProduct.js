import React, { Component } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories } from "./apiAdmin";

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    shipping: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  };

  //load categories and set formdata

  init = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          this.setState({
            categories: data,
            formData: new FormData()
          });
        }
      })
      .catch();
  };

  componentDidMount = () => {
    this.init();
  };

  render() {
    const { user, token } = isAuthenticated();
    const {
      name,
      description,
      price,
      categories,
      quantity,
      loading,
      error,
      createdProduct,
      formData
    } = this.state;

    const handleChange = name => e => {
      const value = name === "photo" ? e.target.files[0] : e.target.value;
      formData.set(name, value);
      this.setState({
        [name]: value
      });
    };

    const handleSubmit = e => {
      e.preventDefault();

      this.setState({
        error: "",
        loading: true
      });

      createProduct(user._id, token, formData).then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          this.setState({
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            createdProduct: data.name
          });
        }
      });
    };

    const showError = () => (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        <h6> {error}</h6>
      </div>
    );

    const showSuccess = () => (
      <div
        className="alert alert-info"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h6>{createdProduct} is created!</h6>
      </div>
    );

    const showLoading = () =>
      loading && (
        <div className="alert alert-success">
          <h6>Loading....</h6>
        </div>
      );

    const newForm = () => (
      <form className="mb-3" onSubmit={handleSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>Please select</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            className="form-control"
            value={quantity}
          />
        </div>
        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    );
    return (
      <Layout
        title="Add a new Product"
        description={`${user.name}, ready to add a new Product?`}
      >
        <div className="row">
          <div className="col-md-6 offset-md-2">
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newForm()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default AddProduct;
