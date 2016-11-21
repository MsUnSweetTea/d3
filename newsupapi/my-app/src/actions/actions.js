var fetch = require('isomorphic-fetch');
//--------USER ACTIONS -------------------------
export const LOG_IN_REQUEST = createAction('LOG_IN_REQUEST');
export const logInRequest = (username, password) => {
  return (dispatch) => {
    const hash = new Buffer(`${username}:${password}`).toString('base64');
    return fetch('/api/v1/users/' + username, {
      headers: {
        'Authorization': `Basic ${hash}`
      }
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => {
        dispatch(loginSuccessful(hash, data.username));
        browserHistory.push('/messages');
      },
      (data) => dispatch(loginFail(data.error || 'Incorrect username and/or password. Please try again.'))
    );
  };
};
export const logInSuccess = createAction('LOG_IN_SUCCESS');
export const logInFailure = createAction('LOG_IN_FAILURE');
//--------------------TO DELETE A USER AS A USER -----------------
export const DELETE_USER = 'DELETE_USER';
export const deleteUser = (userId) => {
  return (dispatch, getState) => {
    const hash = getState().hash;
    const currentUser = getState().currentUser;
    return fetch('/users/' + currentUser , {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
      },
    }).then(response => response.json().then(json => ({ json, response })))
    .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => 
      {
        dispatch(fetchStickies(currentUser));
      },
      ({response, data}) => {
          dispatch(deleteStickyError(data.error));
          
          if(response.status == 401) {
              dispatch(loginFail(data.error));
          }
      }
    );
  };
};
export const deleteUserSuccess = createAction('DELETE_USER_SUCCESS')
export const deleteUserFailure = createAction('DELETE_USER_FAILURE')

export const LOG_USER_OUT = 'LOG_USER_OUT';
export const logUserOut = () => {
  return function (dispatch, getState) {
        if(!getState().isAuthenticated) {
          dispatch(logoutUserFail());
        } else {
          dispatch(logoutUserNow(getState().currentUser));
        }
    };
  }
}

export const LOG_USER_FAILURE = 'LOG_USER_FAILURE';
export const logUserFailure() {
  return {
      type: LOG_USER_FAILURE,
      payload: 'Sorry, you\'re no longer not logged in'
  };
}
//-----------CREATING USER ACTION ----------------
export const CREATE_USER_REQUEST = createAction('CREATE_USER_REQUEST');
export const createUserRequest = (username, password) => {
  return (dispatch, getState) => {
    const hash = getState().hash;
    return fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(response => response.json().then(json => ({ json, response })))
      .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => {
        // var stickyId = data.stickyId
        // console.log(data);
        dispatch(loginRequest(username, password));
      },
      ({response, data}) => {
          dispatch(registerError(data.error));
      }
    );
  };
}

export const successCreateUser = createAction('SUCCESS_CREATE_USER');
export const failureCreateUser = createAction('FAILURE_CREATE_USER');

//------------------------GET CONTACTS ACTIONS --------------------
export const GET_CONTACTS = createAction('GET_CONTACTS');
export const getContact = (username) => {
  return dispatch => {
    return fetch('users/' + username, function callback(res){
      dispatch(loginInSuccess(res.json())),
      dispatch(currentUser());
    });
  };
};
export const successGetContacts = createAction('SUCCESS_GET_CONTACTS');
export const failureGetContacts = createAction('FAILURE_GET_CONTACTS');

//-------------------------------GET MESSAGES ACTIONS --------------
export const GET_MESSAGES = createAction('GET_MESSAGES');

export const getMessages = (currentUser) => {
  return (dispatch, getState) => {
    const hash = getState().hash;
    return fetch('/user/messages', {
      headers: {
        'Authorization': `Basic ${hash}`
      }
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => {
        dispatch(successGetMessages(data));
      },
      ({response, data}) => {
          dispatch(failureGetMessages(data.error));
          
          if(response.status == 401) {
              dispatch(logInFailure(data.error))
          }
      }
    );
  };
}


export const successGetMessages = createAction('SUCCESS_GET_MESSAGES');
export const failureGetMessages = createAction('FAILURE_GET_MESSAGES');

