import * as types from '../helpers/index';

const stateLogin = {
    isFetching: true,
    didInvalidate: false,
    userAuth: null,
    user: null,
    isLogin: false,
  };

const loginReducer = (state = stateLogin, action) =>{
    switch (action.type) {
        case types.REQUEST_LOGIN:

            return {...state,
                isFetching: true,
                didInvalidate: false,
                
            };
        case types.RECEIVE_LOGIN:
            return {...state,
                isFetching: false,
                didInvalidate: false,
                userAuth: action.stateLogin
        
        }
        case types.GET_CURRENT_USER:
            return { ...state, 
                user: action.user, 
                isLogin: true 
            };
        default: return state;
    }
}
export default loginReducer;