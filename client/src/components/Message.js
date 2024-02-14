import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Message = ({ children, type, color }) => {
  return (
    <div className={`ui icon message ${color}`}>
      <i className={`icon ${type}`}></i>
      <div className="content">
        <div className="header">{children}</div>
      </div>
    </div>
  );
};
// eslint-disable-next-line react/no-typos
Message.PropTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
};
Message.defaultProps = {
  type: 'bell',
  color: 'olive',
};
export default Message;