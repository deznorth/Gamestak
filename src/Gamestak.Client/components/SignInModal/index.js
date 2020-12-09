import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { commonSelectors } from 'pages/selectors';
import * as actions from 'app/modules/actions';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignInModal = props => {
  const {
    show,
    handleClose,
  } = props;

  const inputRef = useRef(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSwitchModal = () => {
    dispatch(actions.showModal('signup'));
  }

  const handleSignIn = e => {
    e.preventDefault();
    dispatch(actions.loginAttempt({
      username,
      password,
    }));
  };

  useEffect(() => {
    if (show) inputRef.current?.focus();
  }, [show]);

  const isErrored = useSelector(commonSelectors.selectLoginFailure);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Text className={`text-danger ${isErrored ? '' : 'invisible'}`}>
          Incorrect username and password combination.
        </Form.Text>
        <Form onSubmitCapture={handleSignIn}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control ref={inputRef} autoComplete="username" type="text" onChange={e => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control autoComplete="current-password" type="password" onChange={e => setPassword(e.target.value)}/>
            <Form.Text className="text-muted">
              Due to the nature of the project, passwords are stored without encryption.
              <br/>Please do not use a real password
            </Form.Text>
          </Form.Group>
          <button className="invisible" type="submit" />
        </Form>
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
