import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from 'app/modules/actions';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SignInModal = props => {
  const {
    show,
    handleClose,
  } = props;

  const dispatch = useDispatch();

  const handleSwitchModal = () => {
    dispatch(actions.showModal('signup'));
  }

  const handleSignIn = () => {
    dispatch(actions.loginAttempt({
      username: 'drojas',
      password: 'test',
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        test
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSwitchModal}>Sign Up</Button>
        <Button variant="primary" onClick={handleSignIn}>Sign In</Button>
      </Modal.Footer>
    </Modal>
  );
};

SignInModal.defaultProps = {
  show: false,
  handleClose: () => {},
};

SignInModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default SignInModal;
