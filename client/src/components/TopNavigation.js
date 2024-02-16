import React from 'react';

const TopNavigation = () => {
  return (
    <div className="ui secondary pointing menu">
      <a href="/">Home</a>
      <span className="item" onClick={() => {}}>
        <i className="icon plus" />
        Add new film
      </span>
    </div>
  );
};

export default TopNavigation;
