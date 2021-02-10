import PropTypes from 'prop-types';
import Icon from '../../components/Icon';
import Dropdown from '../../components/Dropdown';
import Menu from '../../components/Menu';

const ProfileOptions = (props) => {
  const handleClick = ({ key }) => {
    if (key === 'logout') {
      props.logoutUser();
    }
  };
  const menu = (
    <Menu onClick={handleClick} style={{ minWidth: '160px' }}>
      <Menu.Item key="logout">
        <div className="Flex AlignItems--Center Font--S14 Primary">
          <Icon name="power-setting" />
          <span className="Ml-12">Logout</span>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <span>
        <Icon name="user-profile" />
      </span>
    </Dropdown>
  );
};

ProfileOptions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default ProfileOptions;
