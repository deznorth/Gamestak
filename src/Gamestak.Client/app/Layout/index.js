import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from 'components/NavBar';
import SignInModal from 'components/SignInModal';
import SignUpModal from 'components/SignUpModal';
import { commonSelectors } from 'pages/selectors';
import * as actions from '../modules/actions';

import './style.scss';

const Layout = props => {
  const {
    children,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initialize());
  }, []);

  const shownModal = useSelector(commonSelectors.selectShownModal);

  const handleCloseModal = () => {
    dispatch(actions.hideModal());
  };

  return (
    <div className="gs-layout">
      <div className="gs-layout__modals-container">
        <SignInModal
          show={shownModal === 'signin'}
          handleClose={handleCloseModal}
        />
        <SignUpModal
          show={shownModal === 'signup'}
          handleClose={handleCloseModal}
        />
      </div>
      <NavBar />
      <div className="gs-layout__container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
