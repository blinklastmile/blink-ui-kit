import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import classNames from 'classnames';

/** Documentation of Simple Button */
function Button({
  disabled, variant, type, ...props
}) {
  const btnClass = classNames('blink-button', variant);
  return (
    <button {...props} disabled={disabled} type="button" className={btnClass} />
  );
}

Button.propTypes = {
  /**
   * Disables the Button, preventing mouse events
   */
  disabled: PropTypes.bool,
  /** Theme to apply on the button. */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'error']),
  /** Type of button, needed for correctly use in Form */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  disabled: false,
  variant: 'primary',
  type: 'button',
};

export default Button;
