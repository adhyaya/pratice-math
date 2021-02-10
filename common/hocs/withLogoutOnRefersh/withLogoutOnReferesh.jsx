
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser as logoutUserAction } from '../../../redux/actions/user';

function withLogoutOnReferesh(Component) {
  function ComponentWithLogoutReferesh(props) {
    const logoutUser = () => {
      props.logoutUserAction();
    };

    const bindEvents = () => {
      window.addEventListener('popstate', logoutUser, false);
      window.addEventListener('beforeunload', logoutUser);
    };

    const unbindEvents = () => {
      window.removeEventListener('popstate', logoutUser);
      window.removeEventListener('beforeunload', logoutUser);
    };

    useEffect(() => {
      bindEvents();
      return unbindEvents;
    }, []);
    return (<Component {...props} />);
  }

  ComponentWithLogoutReferesh.propTypes = {
    logoutUserAction: PropTypes.func.isRequired,
  };

  return connect(null, { logoutUserAction })(ComponentWithLogoutReferesh);
}

export default withLogoutOnReferesh;
