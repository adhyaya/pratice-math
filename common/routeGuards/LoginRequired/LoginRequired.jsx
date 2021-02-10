import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthUser } from '../../../redux/actions/user';

function LoginRequired({
  children, user, login, getAuthUser: _getAuthUser,
}) {
  const router = useRouter();
  const { isFetching, info } = user;
  useEffect(() => {
    if (!login.info.access_token) {
      router.push('/login');
    }
  }, [login.info]);

  useEffect(() => {
    _getAuthUser();
  }, []);

  if (isFetching || !info) {
    return <div>Loading...</div>;
  }
  return (<div>{children}</div>);
}

LoginRequired.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  getAuthUser: PropTypes.func.isRequired,
};

function mapStateToProps({ user, login }) {
  return { user, login };
}
export default connect(mapStateToProps, { getAuthUser })(LoginRequired);
