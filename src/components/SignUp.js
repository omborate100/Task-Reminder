import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import { withNavigation } from './withNavigation'; // Import the HOC

class SignUp extends React.Component {
  state = { phone: '', password: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://uxwpzekzjl.execute-api.eu-north-1.amazonaws.com/prod/api/signup?phone=${this.state.phone}&password=${this.state.password}`);
      if (response.status === 200) {
        console.log(response);
        alert('Registration Successful');
        this.props.navigate('/signin');  // Use navigate function provided by HOC
      } else {
        alert('Registration failed with status: ' + response.status);
      }
    } catch (error) {
      console.error('Sign-up error', error);
      alert('Registration failed');
    }
  };

  render() {
    return (
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} className="signup-form">
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
          <button type="submit" className="signup-btn">Sign Up</button>
          <p className="signin-link">Already have an account? <Link to="/signin">Sign In</Link></p>
        </form>
      </div>
    );
  }
}

export default withNavigation(SignUp); // Wrap your component with the HOC
