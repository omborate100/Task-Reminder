import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import { withNavigation } from './withNavigation';  // Assuming this HOC is created as described before

class SignIn extends React.Component {
  state = { phone: '', password: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://uxwpzekzjl.execute-api.eu-north-1.amazonaws.com/prod/api/signin?phone=${this.state.phone}&password=${this.state.password}`);
      if (response.status === 200) {
        alert('Login Successful');
        this.props.navigate('/tasks');  // Navigate to tasks page on successful login
      } else {
        alert(`Sign-in failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Sign-in error', error);
      alert('Sign-in failed');
    }
  };

  render() {
    return (
      <div className="signin-container">
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit} className="signin-form">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={this.state.phone}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit" className="signin-btn">Sign In</button>
          <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    );
  }
}

export default withNavigation(SignIn);  // Wrap SignIn to inject navigation
