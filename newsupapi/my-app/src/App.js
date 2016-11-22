import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {getAllUsers} from '../actions/actions';
import {connect} from 'react-redux';


class App extends Component {

  componentDidMount() {
    this.props.getData()
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUsers: state.handleActions
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getAllUsers())
  }
}
connect(mapDispatchToProps)(App)
export default App;