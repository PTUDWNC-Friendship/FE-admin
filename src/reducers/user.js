import * as types from '../helpers/index';

const initialState = {
    isFetching: false,
    user: null,
    didInvalidate: false,
    isLogin: false,
    allTutors: []
};

const userState = (state = initialState, action) =>{
    switch (action.type) {
        case types.REQUEST_LOGIN:
            return {...state,
                isFetching: true,
            };
        case types.RECEIVE_LOGIN:
            return {...state,
                isFetching: false
            };
        case types.GET_CURRENT_USER:
            return { ...state,
                isFetching: false,
                isLogin: true,
                user: action.user,            
            };
        case types.GET_ALL_TUTORS:
            return { ...state,
                allTutors: action.allTutors

            }
        default: return state;
    }
};

export default userState;
