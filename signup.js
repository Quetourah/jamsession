import React, { Component } from 'react';
import './signup.css';

class signup extends Component {
    
    render() {
        return (
            <div className="wrapper">
                <h1>Jam Session</h1>
                <div className="form-wrapper">
                    <h2>Sign up</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" className="" placeholder="Enter first name"
                                type="text" name="firstName" formNoValidate onChange={this.handleChange} />
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" className="" placeholder="Enter last name"
                                type="text" name="lastName" formNoValidate onChange={this.handleChange} />
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="" placeholder="Enter email"
                                type="text" name="email" formNoValidate onChange={this.handleChange} />
                        </div>
                        <div className="password">
                            <label htmlFor="email">Password:</label>
                            <input type="text" className="" placeholder="Enter password"
                                type="text" name="email" formNoValidate onChange={this.handleChange} />
                        </div>
                        <div className="createAccount">
                            <button type="submit">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default signup;
