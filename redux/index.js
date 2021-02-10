import { combineReducers } from 'redux';
import user, { clearReduxOnLogout } from '../../views/User/Redux/Reducer';
import login from '../../views/Login/Redux/Reducer';
import notification from '../../views/Notification/Redux/Reducer';
import addEditWebseries from '../../views/AddEditWebseries/Redux/Reducer';

const combinedReducers = combineReducers({
  login,
  user,
  notification,
  addEditWebseries,
});

const rootReducer = (state, action) => {
  let appState = state;
  // As one reducer can not update the key values for other reducer keys here we are handling
  // the logout before actual reducers get fired and setting the whole redux store to undefined.
  appState = clearReduxOnLogout(appState, action);
  return combinedReducers(appState, action);
};

export default rootReducer;
