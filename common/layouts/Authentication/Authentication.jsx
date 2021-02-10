import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import { logo } from '../../constants';

function Authentication({ children }) {
  return (
    <div style={{ background: 'white', minHeight: '100vh', padding: 30 }}>
      <div>
        <Logo src={logo.app.src} alt="logo" width="50px" />
      </div>
      <div style={{ margin: '30px auto 0', maxWidth: '1170px' }}>
        {children}
      </div>
      <div
        style={{
          position: 'fixed', bottom: 8, textAlign: 'center', width: '100%', color: '#212234', lineHeight: '1rem',
        }}
      >
        <span style={{ verticalAlign: 'middle' }}>©</span>
        <span className="Ml-8" style={{ fontSize: '0.75rem', verticalAlign: 'middle' }}>
          ZIQITZA HEALTHCARE LIMITED
        </span>
      </div>
    </div>
  );
}

Authentication.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Authentication;
