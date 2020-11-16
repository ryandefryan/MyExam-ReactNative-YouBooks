import Axios from 'axios';
import { UrlAPI } from './../../supports/UrlAPI.js';
import { SHOWBOOKS_LOADING, SHOWBOOKS_RESULT, SHOWBOOKS_ERROR } from '../ActionTypes.js';

export const onSearchBooks = (title) => {
    return (dispatch) => {
        dispatch({
            type: SHOWBOOKS_LOADING 
        })

        Axios.get(UrlAPI + '/search.json?title=' + title)
        .then((res) => {
            console.log(res)
            dispatch({
                type: SHOWBOOKS_RESULT,
                payload: res.docs
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: SHOWBOOKS_ERROR,
                payload: err.message
            })
        })
    }
}