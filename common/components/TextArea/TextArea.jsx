import { Input as InputAntd } from 'antd';
import PropTypes from 'prop-types';

import './textArea.less';

function TextArea({
  labelText, maxLength, errorText, ...restProps
}) {
  return (
    <div className="TextArea">
      {
        labelText
        && <div className={`TextArea__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      <InputAntd.TextArea maxLength={maxLength} className={`Box--Shadow ${errorText && 'Error--Border'}`} {...restProps} />
      {
        errorText && <span className="TextArea__Error">{errorText}</span>
      }
    </div>
  );
}

TextArea.defaultProps = {
  labelText: '',
  errorText: '',
  maxLength: 200,
};

TextArea.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  maxLength: PropTypes.number,
};

export default TextArea;
