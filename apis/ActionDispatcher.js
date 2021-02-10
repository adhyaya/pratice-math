import { notify } from '../views/Notification/Redux/Action';
import actionTypes from '../redux/actionTypes';

/**
 * Middleware for API call
 * @param {*} serviceMethod API method
 * @param {*} actionTypeSuccess SUCCESS action constant for API call
 * @param {*} actionTypeFailure FAILURE action constant for API call
 * @param {*} actionTypeInProgress REQUEST action constant for API call
 * @param {*} extra Extra params used in reducer for handling
 * @param {*} commonConfig Object to handle loader, success and failure of api.
 * @param {*} callback A callback function if required to handle anything.
 */
function ActionDispatcher(serviceMethod, actionTypeSuccess,
  actionTypeFailure, actionTypeInProgress, extra, commonConfig = {
    loader: false,
  }, callback) {
  return (dispatch) => {
    if (commonConfig.loader) {
      dispatch({
        type: actionTypes.START_LOADER,
      });
    }
    dispatch({
      type: actionTypeInProgress,
      extra,
    });
    serviceMethod()
      .then((response) => {
        if (commonConfig.loader) {
          dispatch({
            type: actionTypes.STOP_LOADER,
          });
        }
        const { headers, body } = response;
        if (body.error) {
          const { message } = body;
          if (commonConfig && commonConfig.isConfirmModal && commonConfig.notificationError) {
            dispatch(notify(message));
          }
          dispatch({
            type: actionTypeFailure,
            code: body.error && body.error.code,
            message: body.message,
            extra,
            headers,
          });
          if (callback) callback(headers, body);
        } else if (body.data) {
          const successMsg = body.message;
          if (commonConfig && commonConfig.isConfirmModal && commonConfig.notificationSucess) {
            dispatch({
              type: actionTypes.OPEN_CONFIRM_MODAL,
              payload: {
                textMessage: successMsg,
              },
            });
          }
          dispatch({
            type: actionTypeSuccess,
            payload: body.data,
            message: body.message,
            extra,
            headers,
            isRedirectedFromAdmin: false,
          });
          if (callback) callback(body.data);
        }
      }).catch((error) => {
        if (commonConfig.loader) {
          dispatch({
            type: actionTypes.STOP_LOADER,
          });
        }
        const errMessage = error;
        if (error && error.status) {
          if (commonConfig && commonConfig.isConfirmModal
            && commonConfig.notificationError && errMessage !== 401) {
            dispatch(notify(error));
          }
          if (errMessage === 401) {
            dispatch(notify(errMessage));
            // call logout function due to invalid auth token
            dispatch({
              type: actionTypes.LOGOUT_SUCCESS,
            });
          } else {
            dispatch(notify(error));
            dispatch({
              type: actionTypeFailure,
              code: error.status,
              message: errMessage,
              extra,
            });
          }
        } else {
          dispatch(notify({ status: 'INTERNET_CONNECTIVITY' }));
          dispatch({
            type: actionTypeFailure,
          });
        }
        if (callback) callback(error.status, error.message);
      });
    return '';
  };
}

export default ActionDispatcher;
