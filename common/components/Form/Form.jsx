/* import libraries */
import React, { useState } from 'react';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

/* import components */
import {
  Form,
  Select,
  Input,
  Switch,
  Icon,
  DatePicker,
  Popover,
  Upload,
  Modal,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import endPoints from '../../../apis/endpoints';

import * as NotificationActions from '../../../views/Notification/Redux/Action';

/* import styles and constants */
import './Form.less';
import strings from '../../../locales/strings';
import keys from '../../constants/constants';
// import * as utils from '../../helpers/';

const { publicRuntimeConfig } = getConfig();

const { TextArea } = Input;
const { Option } = Select;
const { Item } = Form;


function FormFields({
  handleMapClick = () => { },
  actions,
  formDisable,
  form,
  formFields,
}) {
  const [previewModal, setPreviewModal] = useState(false);
  const [upload, setUpload] = useState(false);
  const intl = useIntl();


  function onFileUpload(info, func) {
    const { status, response, name } = info.file;

    if (status !== 'uploading') {
      setUpload(false);
    } else {
      setUpload(true);
    }
    if (status === 'done') {
      setUpload(false);
      func(response.data, name);
    }
  }

  function getOption(data) {
    return (
      <Option key={data} value={data} title={data} className="capatialize">
        {data}
      </Option>
    );
  }

  function getOptionObject(data, field) {
    if (field.searchKey) {
      return (
        <Option
          className="capatialize"
          key={data[field.valueKey]}
          value={data[field.searchKey]}
          title={data[field.titleKey]}
        >
          {data[field.titleKey]}
        </Option>
      );
    }
    return (
      <Option
        className="capatialize"
        key={data[field.valueKey]}
        value={data[field.valueKey]}
        title={data[field.titleKey]}
      >
        {data[field.titleKey]}
      </Option>
    );
  }

  function getOptionReturnObj(data, field) {
    const stringObj = JSON.stringify(data);
    if (field.searchKey) {
      return (
        <Option
          value={data[field.titleKey]}
          key={stringObj}
          title={data[field.titleKey]}
        >
          {data[field.titleKey]}
        </Option>
      );
    }
    return (
      <Option
        key={data[field.valueKey]}
        value={data[field.valueKey]}
        title={data[field.titleKey]}
      >
        {data[field.titleKey]}
      </Option>
    );
  }

  function renderFieldType(field) {
    const disabled = field.disabled ? field.disabled : formDisable;

    if (field && field.type) {
      if (field.type === 'dropdown') {
        return (
          <Select
            style={{ width: field.width ? field.width : '' }}
            disabled={disabled}
            showArrow={!disabled}
            showSearch
            placeholder={intl.formatMessage({
              id: strings.search || '',
            })}
            className="dropdown-search-field"
            onFocus={field.resetField ? field.resetField : () => { }}
            defaultActiveFirstOption={false}
            onSelect={field.onSelect && field.onSelect}
          >
            { field.data && field.data.length
              && field.data.map((data) => {
                if (field.dataType && field.dataType === 'object') {
                  getOptionReturnObj(data, field);
                }
                return field.titleKey || field.valueKey
                  ? getOptionObject(data, field)
                  : getOption(data);
              })}
          </Select>
        );
      } if (field && field.type === 'inputWithImageAfter') {
        return (
          <Input
            className="imagewithafter"
            addonAfter={!formDisable ? (
              <div onClick={() => handleMapClick()}>
                <field.image
                  src={field.imageSource}
                  alt={field.imageAlt}
                  style={field.imageStyle && field.imageStyle}
                />
                {field.imageText ? (
                  <span style={field.imageTextStyle}>
                    {/* <FormattedMessage id={field.imageText} /> */}
                    {field.imageText}
                  </span>
                ) : null}
              </div>
            ) : null}
            type={field && field.type ? field.type : 'text'}
            style={field.style ? field.style : {}}
            maxLength={field.max ? +field.max : ''}
            onBlur={field.blur ? field.blur : () => { }}
            onKeyDown={field.onKeyDown ? field.onKeyDown : () => { }}
            autoComplete="off"
            disabled
            min="0"
            onChange={
              field.change
                ? (e) => {
                  field.change(e);
                }
                : () => { }
            }
          />
        );
      }
      if (field && field.type === 'uploadFile') {
        const { api } = publicRuntimeConfig;
        const { notify } = actions;
        const fileProps = {
          name: 'image_url',
          action: `${api.baseUrl}/${api.apiVersionKey}/${endPoints.imageUpload}`,
          showUploadList: false,

          beforeUpload: (file) => {
            const isLessThan1MB = file.size < keys.oneMb;
            if (!isLessThan1MB) {
              const payload = { status: keys.greaterThan1mb };
              notify(payload);
            }
            return isLessThan1MB;
          },
        };
        return (
          <>
            <Modal
              visible={previewModal}
              closable
              onOk={() => setPreviewModal(false)}
              onCancel={() => setPreviewModal(false)}
              footer={null}
            >
              <img className="preview-img" src={field.image} alt="img-preview" />
            </Modal>
            {(!upload && field.image) || field.image || field.disabled ? (
              <div className="image-container">
                <img className="img" src={field.image} aria-hidden alt="image" />
                {!field.disabled && (
                  <div className="optionContainer">
                    <span className="preview" onClick={() => setPreviewModal(true)}>
                      {/* <FormattedMessage id={strings.preview} /> */}

                    </span>
                    <Upload
                      className="edit-upload"
                      accept={field.fileType}
                      onChange={(e) => { onFileUpload(e, field.onFileUpload); }}
                      {...fileProps}
                      // headers={{

                      // }}
                      disabled={formDisable}
                    >
                      <span className="edit-icon">
                        {/* <FormattedMessage id={strings.editIcon} /> */}
                      </span>
                    </Upload>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Upload
                  className="form-field-dragger"
                  accept={field.fileType}
                  onChange={(e) => { onFileUpload(e, field.onFileUpload); }}
                  {...fileProps}
                  // headers={{
                  //   authorization: `Bearer ${token}`,
                  // }}
                  disabled={formDisable}
                >
                  <>
                    <UploadOutlined className="icon-upload-form-fields" />
                    <span>
                      {/* <FormattedMessage id={strings.uploadImg} /> */}
                    </span>
                  </>

                </Upload>

              </>
            )}
          </>
        );
      }
      if (field && field.type === 'multiDropdown') {
        return (
          <Select
            mode="multiple"
            placeholder={intl.formatMessage({
              id: strings.search || '',
            })}
            showArrow
            disabled={formDisable || field.disabled}
            onChange={
              field.change
                ? (_value, event) => {
                  field.change(_.map(event, 'key'));
                }
                : () => { }
            }
            onSelect={
              field.select
                ? (_value, event) => {
                  field.select(event.key);
                }
                : () => { }
            }
            onDeselect={
              field.deSelect
                ? (_value, event) => {
                  field.deSelect(event.key);
                }
                : () => { }
            }
          >
            {field.data && field.data.map((data) => (
              field.titleKey || field.valueKey
                ? getOptionObject(data, field)
                : getOption(data)
            ))}
          </Select>
        );
      } if (field && field.type === 'textarea') {
        return (
          <TextArea
            className="textarea"
            rows={3}
            maxLength={field.max ? +field.max : ''}
            disabled={formDisable || field.disabled}
            onChange={
              field.change
                ? (e) => {
                  field.change(e);
                }
                : () => { }
            }
          />
        );
      } if (field && field.type === 'checkbox') {
        return (
          <Switch
            onChange={
              field.change
                ? (e) => {
                  field.change(e);
                }
                : () => { }
            }
            checked={field.checked}
            disabled={field.disabled ? field.disabled : false}
          />
        );
      } if (field && field.type === 'switch') {
        return (
          <Switch
            className="form-field-switch"
            checked={field && field.checked}
            onChange={(value) => {
              if (field.change) {
                field.change(value, field);
              }
            }}
            disabled={field.disabled ? field.disabled : false}
          />
        );
      } if (field && field.type === 'datetimepicker') {
        return (
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            disabledDate={
              field.disabledDate
                ? (e) => field.disabledDate(e, field.key)
                : () => { }
            }
            disabledTime={
              field.disabledTime
                ? (e) => field.disabledTime(e, field.key)
                : () => { }
            }
            onOk={field.onOk ? (e) => field.onOk(e, field.key) : () => { }}
            onChange={
              field.change
                ? (date, dateString) => field.change(date, dateString, field.key)
                : () => { }
            }
            value={field.value ? field.value : ''}
            disabled={field.disabled}
            format="DD-MM-YYYY HH:mm"
            use12Hours={false}
          />
        );
      } if (field && field.type === 'rating') {
        return (
          <div className="rating-style-container">
            <Input
              type={field && field.type ? field.type : 'text'}
              addonAfter="/5"
              maxLength={field.max ? +field.max : ''}
              onBlur={field.blur ? field.blur : () => { }}
              onKeyDown={field.onKeyDown ? field.onKeyDown : () => { }}
              autoComplete="off"
              disabled={formDisable || field.disabled}
              min="0"
              onChange={
                field.change
                  ? (e) => {
                    field.change(e);
                  }
                  : () => { }
              }
            />
          </div>
        );
      }
      if (field && field.type === 'link') {
        return (
          <div>
            {field.value && field.value.length && field.value.map((item) => (
              <>
                <a href={`https://${item.trim()}`} target="blank">
                  {item}
                </a>
                  &nbsp;&nbsp;&nbsp;
              </>
            ))}
          </div>
        );
      } if (field && field.type === 'text') {
        return (
          <Input
            type={field && field.type ? field.type : 'text'}
            maxLength={field.max ? +field.max : ''}
            onBlur={field.blur ? field.blur : () => { }}
            onKeyDown={field.onKeyDown ? field.onKeyDown : () => { }}
            autoComplete="off"
            disabled={formDisable || field.disabled}
            min="0"
            className="customInput"
            prefix={field.prefix && field.prefix}
            onChange={
              field.change
                ? (e) => {
                  field.change(e);
                }
                : () => { }
            }
          />
        );
      }
    }

    return null;
  }

  function renderForm() {
    return (
      <>
        <Form
          form={form}
          colon={false}
          requiredMark={false}
        >
          {formFields && formFields.map((field) => {
            const rules = [];
            if (field && field.required) {
              rules.push({
                required: field.required[0],
                message: intl.formatMessage({
                  id: field.required[1] || '',
                }),
                type: field.required[2] || '',
              });
            }
            if (field && field.pattern) {
              rules.push({
                pattern: field.pattern[0],
                message: intl.formatMessage({
                  id: field.pattern[1] || '',
                }),
              });
            }
            if (field && field.fixType) {
              rules.push({
                type: field.fixType[0],
                message: field.fixType[1],
              });
            }
            if (field && field.validator) {
              rules.push({
                validator: field.validator,
              });
            }

            const decorator = {
              initialValue: field && field.value,
              rules,
            };

            if (field && field.valuePropName) {
              decorator.valuePropName = field.valuePropName;
            }
            if (field) {
              return (
                <Item
                  style={field.fieldStyle || {}}
                  name={field && field.key}
                  key={field && field.label}
                  label={(
                    <span className="field-label">
                      <FormattedMessage id={field.label} />

                      {' '}

                      {field && field.toolTip && field.content && (
                        <Popover
                          placement="rightTop"
                          content={field && field.content}
                        >
                          <Icon type="info-circle" />
                        </Popover>
                      )}
                    </span>
                  )}
                  rules={rules}
                >
                  {renderFieldType(field)}
                </Item>
              );
            }
            return null;
          })}
        </Form>
      </>
    );
  }
  return <div className="FormFields">{renderForm()}</div>;
}

FormFields.defaultProps = {
  formDisable: false,
  actions: {},
  handleMapClick: () => { },
};

FormFields.propTypes = {
  formDisable: PropTypes.bool,
  actions: PropTypes.object,
  handleMapClick: PropTypes.func,
  formFields: PropTypes.array.isRequired,
  form: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifyState: state.notify,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...NotificationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormFields);
