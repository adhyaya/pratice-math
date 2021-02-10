import { TimePicker as TimePickerAntd } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import './timePicker.less';

function TimePicker({
  labelText, format, isReadonly, errorText, ...restProps
}) {
  return (
    <div className="TimePicker">
      {
        labelText
        && <div className={`TimePicker__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        !isReadonly
          ? (
            <TimePickerAntd format={format} className={`Box--Shadow ${errorText && 'Error--Border'}`} {...restProps} />
          )
          : (
            <div className="GrayDark-Text" style={{ marginTop: '10px', wordBreak: 'break-all' }}>
              {restProps.value && dayjs(restProps.value).format(format)}
            </div>
          )
      }
      {
        errorText && <span className="TimePicker__Error">{errorText}</span>
      }
    </div>
  );
}

TimePicker.defaultProps = {
  labelText: '',
  errorText: '',
  format: 'HH:mm',
  isReadonly: false,
};

TimePicker.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  format: PropTypes.string,
  isReadonly: PropTypes.bool,
};

export default TimePicker;
