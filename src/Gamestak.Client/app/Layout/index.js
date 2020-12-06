import React from 'react';
import { connect } from 'react-redux';
import NavBar from 'components/NavBar';

import './style.scss';

const Layout = props => {
  const {
    children,
  } = props;

  return (
    <div className="gs-layout">
      <NavBar />
      <div className="gs-layout__container">
        {children}
      </div>
    </div>
  );
};

export default connect(state => ({}), {})(Layout);
