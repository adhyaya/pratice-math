import { DatePicker as DatePickerAntd } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import './datePicker.less';

function DatePicker({
  labelText, format, isReadonly, errorText, ...restProps
}) {
  return (
    <div className="DatePicker">
      {
        labelText
        && <div className={`DatePicker__Label ${errorText && 'Error'}`}>{labelText}</div>
      }
      {
        !isReadonly
          ? (
            <DatePickerAntd format={format} className={`Box--Shadow ${errorText && 'Error--Border'}`} {...restProps} />
          )
          : (
            <div className="GrayDark-Text" style={{ marginTop: '10px', wordBreak: 'break-all' }}>
              {restProps.value && dayjs(restProps.value).format(format)}
            </div>
          )
      }
      {
        errorText && <span className="DatePicker__Error">{errorText}</span>
      }
    </div>
  );
}

DatePicker.defaultProps = {
  labelText: '',
  errorText: '',
  format: 'DD MMM YYYY',
  isReadonly: false,
};

DatePicker.propTypes = {
  labelText: PropTypes.string,
  errorText: PropTypes.string,
  format: PropTypes.string,
  isReadonly: PropTypes.bool,
};

export default DatePicker;
