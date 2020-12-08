import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LinkContainer } from 'react-router-bootstrap';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import './style.scss';

export const GameCard = props => {

  const {
    className,
    gameID,
    title,
    publisher,
    price,
    discountPrice,
    discountRate,
    thumbnailUrl,
    isOnSale,
  } = props;

  const cn = classNames(
    className,
    'gs-game-card',
  );

  return (
    <LinkContainer to={`/game/${gameID}`} exact style={{ cursor: 'pointer' }}>
      <Card className={cn}>
        <Card.Img variant="top" src={thumbnailUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {publisher}
          </Card.Text>
          <div>
            {
              isOnSale && price > 0 ?
              <>
                <Badge variant="primary" className="mr-2">{discountRate}</Badge>
                <span className="mr-2 text-muted"><s>{price}</s></span>
              </> : null
            }
            <span>{isOnSale ? discountPrice : (price > 0 ? price : 'Free To Play!')}</span>
          </div>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

GameCard.defaultProps = {
  className: '',
  price: 0.00,
  discountPrice: 0.00,
  discountRate: 0,
  isOnSale: false,
};

GameCard.propTypes = {
  className: PropTypes.string,
  gameID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  price: PropTypes.number,
  discountPrice: PropTypes.number,
  discountRate: PropTypes.number,
  thumbnailUrl: PropTypes.string.isRequired,
  isOnSale: PropTypes.bool,
};
