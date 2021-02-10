import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification as notificationUtil } from 'antd';
import { closeNotification } from '../../../redux/actions/notification';
import { errors } from '../../constants';

import Icon from '../Icon';

const iconNameMap = {
  error: 'error-info',
};

function handleClose() {
  this.closeNotification(this.messageKey);
}

function Notification({ duration, messages = {}, ...restProps }) {
  useEffect(() => {
    Object.keys(messages).forEach((messageKey) => {
      const { type, ...restError } = errors[messageKey];
      const icon = (<Icon name={iconNameMap[type]} />);
      const closeIcon = (<Icon name="cross" />);
      notificationUtil[type]({
        ...restError,
        duration,
        icon,
        closeIcon,
        key: messageKey,
        onClose: handleClose.bind({ messageKey, closeNotification: restProps.closeNotification }),
      });
    });
  }, [messages]);
  return null;
}

Notification.defaultProps = {
  duration: 0, // open until close
};

Notification.propTypes = {
  duration: PropTypes.number,
  messages: PropTypes.object.isRequired,
  closeNotification: PropTypes.func.isRequired,
};

function mapStateToProps({ notification }) {
  return { messages: notification.messages };
}

export default connect(mapStateToProps, { closeNotification })(Notification);
