import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import Logo from '../../components/Logo';
import { logo } from '../../constants';
import { logoutUser } from '../../../redux/actions/user';

import './protectedPages.less';

const ProfileOptions = dynamic(() => import('./ProfileOptions'));

function ProtectedPages({ children, ...restProps }) {
  return (
    <div className="Layout__ProtectedPages">
      <div className="Layout__ProtectedPages__NavbarWrap">
        <Navbar>
          <Logo src={logo.app.src} alt="logo" width="50px" />
          <div>
            <ProfileOptions logoutUser={restProps.logoutUser} />
          </div>
        </Navbar>
      </div>
      <div className="Layout__ProtectedPages__ContentWrap">
        {children}
      </div>
    </div>
  );
}

ProtectedPages.propTypes = {
  children: PropTypes.element.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(ProtectedPages);
