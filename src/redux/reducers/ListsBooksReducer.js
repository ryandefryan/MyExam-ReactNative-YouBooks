import { SHOWBOOKS_LOADING, SHOWBOOKS_RESULT, SHOWBOOKS_ERROR } from './../ActionTypes.js';

const data = {
    loading: false, 
    data: null, 
    error: null
}

function listsBooksReducer (state = data, action){
    switch(action.type){
        case SHOWBOOKS_LOADING: 
            return {loading: true, data: null, error: null}
        case SHOWBOOKS_RESULT:
            return {loading: false, data: action.payload, error: null}
        case SHOWBOOKS_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default listsBooksReducer