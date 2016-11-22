import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {logInRequest} from './actions';


var Login = React.createClass({
    
    onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit(this.refs.usernameText.value, this.refs.passwordText.value);
        this.refs.usernameText.value = "";
        this.refs.passwordText.value = "";
    },
    
    render: function() {
        return (
            <div className="login-container">
                <form>
                    <legend>Login to your account</legend>

                    <span className="username"> Username:</span>

                    <input type="text" id="username" className="input" ref="usernameText" required />
                    
                    <span className="password">Password:</span>

                    <input type="password" className="input" name="password" ref="passwordText" required />
                    
                    <input type="submit" id="submit" onClick={this.onSubmit} value="Submit" className="submit-button"></input>
                </form>
            </div>
        );
    }
});


const mapDispatchToProps = (dispatch) => {
    return {
        onAddSubmit: function(username, password) {
            dispatch(logInRequest(username, password));
        }
    };
}

export default connect(null,mapDispatchToProps)(Login);