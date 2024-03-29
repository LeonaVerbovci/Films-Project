import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../pages/FilmsPage';

const Featured = ({ featured, id }) => {
  const { toggleFeatured } = useContext(AppContext);
  const cls = featured ? 'yellow' : 'empty';

  return (
    <span className="ui right corner label" onClick={() => toggleFeatured(id)}>
      <i className={`star icon ${cls}`} />
    </span>
  );
};

Featured.propTypes = {
  featured: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Featured;
