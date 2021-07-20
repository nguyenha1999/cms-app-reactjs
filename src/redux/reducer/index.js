/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
import { combineReducers } from 'redux';
import document from './doc'
import procedure from './group';


const rootReducer = combineReducers({

    document,
    procedure,

});

export default rootReducer;