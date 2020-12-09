import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { commonSelectors } from 'pages/selectors';
import * as actions from 'app/modules/actions';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUpModal = props => {
  const {
    show,
    handleClose,
  } = props;

  const inputRef = useRef(null);

  const [touched, setTouched] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isErrored = useSelector(commonSelectors.selectRegisterFailure);

  const passwordsMatch = confirmPassword === password;

  const dispatch = useDispatch();

  const handleSwitchModal = () => {
    dispatch(actions.showModal('signin'));
  }

  const handleSignUp = e => {
    e.preventDefault();
    setTouched(true);
    if (passwordsMatch) {
      dispatch(actions.registerAttempt({
        username,
        password,
      }));
    }
  };

  useEffect(() => {
    if (show) inputRef.current?.focus();
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Text className={`text-danger ${isErrored ? '' : 'invisible'}`}>
          Username already taken.
        </Form.Text>
        <Form onSubmitCapture={handleSignUp}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control ref={inputRef} autoComplete="username" type="text" onChange={e => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control autoComplete="new-password" type="password" onChange={e => setPassword(e.target.value)}/>
            <Form.Text className="text-muted">
              Due to the nature of the project, passwords are stored without encryption.
              <br/>Please do not use a real password
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control autoComplete="new-password" type="password" onChange={e => setConfirmPassword(e.target.value)}/>
            <Form.Text className={`text-danger ${(touched && !passwordsMatch) ? '' : 'invisible'}`}>
              Passwords do not match!
            </Form.Text>
          </Form.Group>
          <button className="invisible" type="submit" />
        </Form>
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
