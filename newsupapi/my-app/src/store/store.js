
import React from 'react';
import reducers from '../reducers'; 
import { createStore, applyMiddleWare} from 'redux';
import thunk from 'redux-thunk'


const actions = require('../actions/actions')
const currentQuestion = actions.CurrentQuestion


const store = createStore(reducers,
	applyMiddleware(thunk));

store.subscribe(() => {
   
});

store.dispatch(currentQuestion)

export default store;