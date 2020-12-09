import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from 'app/modules/actions';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SignUpModal = props => {
  const {
    show,
    handleClose,
  } = props;

  const dispatch = useDispatch();

  const handleSwitchModal = () => {
    dispatch(actions.showModal('signin'));
  }

  const handleSignUp = () => {
    dispatch(actions.registerAttempt({
      username: 'test',
      password: 'test',
    }))
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        test
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSwitchModal}>Sign In</Button>
        <Button variant="primary" onClick={handleSignUp}>Sign Up</Button>
      </Modal.Footer>
    </Modal>
  );
};

SignUpModal.defaultProps = {
  show: false,
  handleClose: () => {},
};

SignUpModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default SignUpModal;
