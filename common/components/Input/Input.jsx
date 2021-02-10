import { Input as InputAntd } from 'antd';
import PropTypes from 'prop-types';

import './input.less';

function Input({ labelText, errorText, ...restProps }) {
  return (
    <div className="Input">
      {
        labelText
        && <span className={`Input__Label ${errorText && 'Error'}`}>{labelText}</span>
      }
      <InputAntd className={`Box--Shadow ${errorText && 'Error--Border'}`} {...restProps} />
      {
        errorText && <span className="Input__Error">{errorText}</span>
      }
    </div>
  );
}

Input.defaultProps = {
  labelText: '',
  errorText: '',
  maxLength: 30,
};

Input.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
};

export default Input;
