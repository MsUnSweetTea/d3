import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {deleteUser} from './actions';

var Delete = React.createClass({
    
    onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit(this.refs.usernameText.value, this.refs.passwordText.value);
        this.refs.usernameText.value = "";
        this.refs.passwordText.value = "";
    },
    
    render: function() {
        return (
            <div className="delete-container">

                 <input type="submit" id="delete" onClick={this.onSubmit} value="Delete" className="submit-button"></input>
            </div>
        );
    }
});


const mapDispatchToProps = (dispatch) => {
    return {
        onAddSubmit: function(username, password) {
            dispatch(deleteUser(username, password));
        }
    };
}

export default connect(null,mapDispatchToProps)(Delete);