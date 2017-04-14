import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Input = ({ type, name, value, label, touched, error, autoFocus, onChange, onBlur }) => {

  return (
    <div className={classnames('input__wrapper', { 'has-error': touched && error, 'not-pristine': value !== '' })}>
      <input
        id={name} // TODO: We should generate a unique ID instead of using name attr.
        value={value}
        type={type}
        name={name}
        className="input__field"
        autoFocus={autoFocus}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label
        htmlFor={name} // TODO: We should generate a unique ID instead of using name attr.
        className="input__label">
        {label}
      </label>
      {touched && error && <span className="validation-text">{error}</span>}
    </div>);
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  touched: true,
  autoFocus: false,
};

export default Input;
