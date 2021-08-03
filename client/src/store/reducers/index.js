import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import document from './Document';
import procedure from './Procedure';
import history from './History';
import user from './User';
import report from './Report';
import ui from './Ui';

const config = {
    key: 'LNH',
    blacklist: [],
    storage
};

const rootReducer = combineReducers({
    ui,
    document,
    procedure,
    history,
    user,
    report,
});

export default persistReducer(config, rootReducer);