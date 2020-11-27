import React from 'react';
import { connect } from 'react-redux';

const Layout = props => {
  const {
    children,
  } = props;

  return (
    <div className="gs-layout">
      {children}
    </div>
  );
};

export default connect(state => ({}), {})(Layout);
