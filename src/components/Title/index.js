import PropTypes from 'prop-types';
import React from 'react';

function Title({ text }) {
  // eslint-disable-next-line react/jsx-filename-extension
  return <h1>{text}</h1>;
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
