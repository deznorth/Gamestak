import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';

import './style.scss';

export const Loader = props => {
  const {
    className,
    gradient,
  } = props;

  const cn = classNames(
    'd-flex justify-content-center align-items-center w-100 h-50',
    className,
    {
      'gs-loader--gradient-top': gradient === 'top',
      'gs-loader--gradient-horizontal': gradient === 'horizontal',
      'gs-loader--gradient-vertical': gradient === 'vertical',
    },
    'gs-loader',
  );

  return (
    <div className={cn}>
      <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
    </div>
  );
};

Loader.defaultProps = {
  className: '',
  gradient: 'top',
};

Loader.propTypes = {
  className: PropTypes.string,
  gradient: PropTypes.oneOf(['','horizontal','vertical','top']),
};
