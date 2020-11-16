import { combineReducers } from 'redux';

import listsBooksReducer from './ListsBooksReducer.js';

const rootReducer = combineReducers(
    {
        listsBooks: listsBooksReducer
    }
)

export default rootReducer