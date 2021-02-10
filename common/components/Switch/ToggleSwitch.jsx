import PropTypes from 'prop-types';
import Switch from './Switch';

export default function ToggleSwitch({
  checkedValue, values, onChange, textValues, ...restProps
}) {
  function handleChange(value) {
    if (value) {
      onChange(values[0]);
    } else {
      onChange(values[1]);
    }
  }
  const value = checkedValue.name || checkedValue;
  const isChecked = (value === values[0].name || value === values[0]);

  function getTextValue() {
    let textValue = '';
    if (textValues.length) {
      textValue = isChecked ? textValues[0] : textValues[1];
    }
    return textValue.name || textValue;
  }
  return (
    <Switch
      checked={isChecked}
      disabled={restProps.isReadonly}
      labelText={restProps.labelText}
      text={getTextValue()}
      errorText={restProps.errorText}
      onChange={handleChange}
    />
  );
}

ToggleSwitch.defaultProps = {
  onChange: () => {},
  checkedValue: '',
  restProps: {},
  textValues: [],
};

ToggleSwitch.propTypes = {
  values: PropTypes.array.isRequired,
  textValues: PropTypes.array,
  onChange: PropTypes.func,
  checkedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  restProps: PropTypes.object,
};
