import { combineReducers } from 'redux';
import logs from './log_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    logs,
    user
});

export default rootReducer;