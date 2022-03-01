import React, { Component } from "react";
import image from "../image/authentication.svg";
import "../style/signup.css";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { signup } from "../auth/index";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  };

  onChange = e => {
    this.setState({
      ...this.state,
      error: false,
      [e.target.id]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.setState({ ...this.state, error: false });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        this.setState({ ...this.state, error: data.error, success: false });
      } else {
        this.setState({
          ...this.state,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  render() {
    const showError = () => (
      <div
        className="alert alert-danger"
        style={{ display: this.state.error ? "" : "none" }}
      >
        {this.state.error}
      </div>
    );

    const showSuccess = () => (
      <div
        className="alert alert-info"
        style={{ display: this.state.success ? "" : "none" }}
      >
        New account is created. Please <Link to="/signin">Singin</Link>
      </div>
    );
    return (
      <React.Fragment>
        <div className="loginDiv">
          <div className="row">
            <div className="col-md-6 limit">
              <img src={image} alt="" />
            </div>
            <div className="col-md-6">
              <div className="auth__auth">
                <h1 className="auth__title">Access your account</h1>
                <p style={{ textAlign: "center" }}>
                  Fill in your email and password to proceed
                </p>

                <Form className="form" onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label>Name</Label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="loginInput"
                      placeholder="ABC"
                      onChange={this.onChange}
                    />
                    <Label>Email</Label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="loginInput"
                      placeholder="xyz@example.com"
                      onChange={this.onChange}
                    />

                    <Label>Password</Label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="loginInput"
                      onChange={this.onChange}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    />
                    <Button
                      type="submit"
                      onClick={this.toggle}
                      className="button button__accent"
                    >
                      Signup
                    </Button>
                  </FormGroup>
                </Form>
                {showSuccess()}
                {showError()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;
