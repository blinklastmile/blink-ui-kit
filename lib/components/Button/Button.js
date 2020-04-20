function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import './style.scss';
import classNames from 'classnames';
/** Documentation of Simple Button */

function Button(_ref) {
  var disabled = _ref.disabled,
      variant = _ref.variant,
      type = _ref.type,
      props = _objectWithoutPropertiesLoose(_ref, ["disabled", "variant", "type"]);

  var btnClass = classNames('blink-button', variant);
  return /*#__PURE__*/React.createElement("button", _extends({}, props, {
    disabled: disabled,
    type: "button",
    className: btnClass
  }));
}

Button.defaultProps = {
  disabled: false,
  variant: 'primary',
  type: 'button'
};
export default Button;