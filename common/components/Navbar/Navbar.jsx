import PropTypes from 'prop-types';
import './navbar.less';

function Navbar({ children }) {
  return (
    <div className="Navbar Box--Shadow">
      {children}
    </div>
  );
}

Navbar.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Navbar;
