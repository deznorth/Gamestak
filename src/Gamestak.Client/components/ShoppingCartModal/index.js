import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { commonSelectors } from 'pages/selectors';
import * as actions from 'app/modules/actions';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import CartTable from './CartTable';

import './style.scss';

const SignInModal = props => {
  const {
    show,
    handleClose,
  } = props;

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const currentUser = useSelector(commonSelectors.selectCurrentUser);
  const shoppingCart = useSelector(commonSelectors.selectShoppingCart);
  const isErrored = useSelector(commonSelectors.selectCheckoutFailure);

  const handleRemoveItem = (id) => {
    dispatch(actions.removeFromCart(id));
  }

  const handleClearCart = () => {
    dispatch(actions.clearCart());
  }

  const handleCheckout = e => {
    e.preventDefault();
    dispatch(actions.checkoutAttempt({
      userID: currentUser.userId,
      gameIDs: shoppingCart.map(i => parseInt(i.gameID)),
    }));
  };

  useEffect(() => {
    if (show) inputRef.current?.focus();
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} className="gs-cart">
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Text className={`text-danger ${isErrored ? '' : 'invisible'}`}>
          Your payment could not be processed.
        </Form.Text>
        <Form onSubmitCapture={handleCheckout}>
          <CartTable items={shoppingCart} removeHandler={handleRemoveItem} />
          <button className="invisible" type="submit" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClearCart}>Clear Cart</Button>
        <Button variant="primary" onClick={handleCheckout}>One Click Checkout</Button>
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
