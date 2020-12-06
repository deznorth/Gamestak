import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import './style.scss';

export const GameCard = props => {

  const {
    className,
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
    <Card className={cn}>
      <Card.Img variant="top" src={thumbnailUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {publisher}
        </Card.Text>
        <div>
          {
            isOnSale ?
            <>
              <Badge variant="primary" className="mr-2">{discountRate}</Badge>
              <span className="mr-2 text-muted"><s>{price}</s></span>
            </> : null
          }
          <span>{isOnSale ? discountPrice : price}</span>
        </div>
      </Card.Body>
    </Card>
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
  title: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  price: PropTypes.number,
  discountPrice: PropTypes.number,
  discountRate: PropTypes.number,
  thumbnailUrl: PropTypes.string.isRequired,
  isOnSale: PropTypes.bool,
};
