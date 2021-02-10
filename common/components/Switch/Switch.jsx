import { Switch as SwitchAnt } from 'antd';
import PropTypes from 'prop-types';

import './switch.less';

function Switch({
  labelText,
  errorText,
  text,
  ...restProps
}) {
  return (
    <div className="Switch">
      {
        labelText
        && <div className={`Switch__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      <SwitchAnt {...restProps} />
      {
        text
        && <span className="Switch__Text">{text}</span>
      }
      {
        errorText && <span className="Switch__Error">{errorText}</span>
      }
    </div>
  );
}

Switch.defaultProps = {
  labelText: '',
  errorText: '',
  text: '',
};

Switch.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  text: PropTypes.string,
};

export default Switch;
