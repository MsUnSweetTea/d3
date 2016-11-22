import {LOG_IN_REQUEST} from './actions'
import logInRequest from './actions'
import {LOG_IN_SUCCESS} from './actions'
import logInSuccess from './actions'
import {LOG_IN_FAILURE} from './actions'
import logInFailure from './actions'
import {DELETE_USER} from './actions'
import deleteUser from './actions'
import {DELETE_USER_SUCCESS} from './actions'
import deleteUserSuccess from './actions'
import {DELETE_USER_FAILURE} from './actions'
import deleteUserFailure from './actions'
import {CREATE_USER_REQUEST} from './actions'
import createUserRequest from './actions'
import {SUCCESS_CREATE_USER} from './actions'
import successCreateUser from './actions'
import {FAILURE_CREATE_USER} from './actions'
import failureCreateUser from './actions'
import {GET_CONTACTS} from './actions'
import getContacts from './actions'
import {SUCCESS_GET_CONTACTS} from './actions'
import successGetContacts from './actions'
import {FAILURE_GET_CONTACTS} from './actions'
import failureGetContacts from './actions'
import {GET_MESSAGES} from './actions'
import getMessages from './actions'
import {SUCCESS_GET_MESSAGES} from './actions'
import successGetMessages from './actions'
import {FAILURE_GET_MESSAGES} from './actions'
import failureGetMessages from './actions'

const initialState = {
    messages: [],
    loginError: null,
    userList: [],
    fetchGetError: null,
    fetchPostError: null,
    editPostError: null,
    deletePostError: null,
    isAuthenticated: false,
    createUserError: null,
    hash: null,
    currentUser: null
};

export default handleActions ({
    [actions.failureCreateUser]: (state, action) => {
    	return [...state, action.payload, createUserError: true];
    },
    [actions.logInSuccess]: (state, action) =>{
    	return [...state, isAuthenticated: true, hash: action.payloadHash, currentUser: action.payloadUsername];
    },
    [actions.logInFailure]: (state, action) => {
    	return [...state, isAuthenticated: false,
                error: action.payload]
    },
    [actions.logoutUserPresent]: (state, action) => {
    	return [...state, previousUser: action.payload]
    },
    [actions.getAllUsers]: (state, action) => {
    	return[...state, userList[action.payload]]
    },
    [actions.logUserFailure]: (state, action) => {
    	return[...state, action.type]
    },
    [action.getContact]: (state, action) => {
    	return[...state, [action.payload]]
    },
    [action.failureGetContacts]: (state, action) => {
    	return[...state, error]
    },
    [action.getMessages]: (state, action) => {
    	return[...state, [action.payload]]
    },
    [action.failureGetMessages]: (state, action) => {
    	return[...state, error]
    }
})     

//         case POST_STICKY_SUCCESS:
//             return assignState({
//                 stickies: state.stickies.concat({
//                     stickyId: action.payloadStickyId, 
//                     title: action.payloadTitle, 
//                     content: action.payloadContent
//                 })
//             })
//         case POST_STICKY_ERROR:
//             return assignState({
//                 fetchPostError: action.payload
//             });
//         case EDIT_STICKY_SUCCESS:
// 	        return newState;
//         case EDIT_STICKY_ERROR:
//             return assignState({
//                 editPostError: action.payload
//             });
//         case DELETE_STICKY_SUCCESS:
//             return newState;
        
//         case DELETE_STICKY_ERROR:
//             return assignState({
//                 deletePostError: action.payload
//             });
//             return newState;
            
//         default:
//             return state;
//     }
// }

export default reducers;