import PropTypes from 'prop-types';
import { Spin } from 'antd';

export default function ContentWrap({
  isFetching, isError, children, style,
}) {
  if (isError) {
    return (<div className="Mt-20 ContentWrap">Something went wrong...</div>);
  }

  if (isFetching) {
    return (
      <div className="ContentWrap" style={{ paddingTop: 60, textAlign: 'center', ...style }}>
        <Spin size="large" />
      </div>
    );
  }

  return children;
}

ContentWrap.defaultProps = {
  isError: false,
  style: {},
};

ContentWrap.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  style: PropTypes.object,
};
