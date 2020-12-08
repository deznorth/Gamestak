import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NavBar from 'components/NavBar';
import * as actions from '../modules/actions';

import './style.scss';

const Layout = props => {
  const {
    children,
    initialize
  } = props;

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="gs-layout">
      <NavBar />
      <div className="gs-layout__container">
        {children}
      </div>
    </div>
  );
};

export default connect(state => ({
}), {
  initialize: actions.initialize,
})(Layout);
