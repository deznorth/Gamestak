import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { Loader } from '../Loader';

import './style.scss';

const ImagesCarousel = ({ images }) => {
  return (
    <Carousel className="gs-featured-carousel__game__carousel">
      {
        images.map(gi => {
          return (
            <Carousel.Item key={gi.imageID}>
              <Image className="d-block w-100" src={gi.url} alt={`Image-${gi.imageID}`} />
            </Carousel.Item>
          );
        })
      }
    </Carousel>
  );
};

export const FeaturedGamesCarousel = props => {
  const {
    className,
    games,
    loading,
  } = props;

  const cn = classNames(
    className,
    'gs-featured-carousel',
  );

  return (
    <div className={cn}>
      <div className="gs-featured-carousel__container">
        { loading && <Loader gradient='horizontal' /> }
        { !loading && (
            <Carousel interval={15000} pause={'hover'} fade>
              {
                games.map(g => {
                  return (
                    <Carousel.Item key={g.gameID}>
                      <div className="gs-featured-carousel__game">
                        <ImagesCarousel images={g.imageCollection} />
                        <div className="gs-featured-carousel__game__info">
                          <div>
                            <h1>{g.title}</h1>
                            <p>{g.description}</p>
                          </div>
                          <LinkContainer to={`/game/${g.gameID}`} exact className="gs-featured-carousel__game__info__cta">
                            <Button variant="primary">PLAY NOW!</Button>
                          </LinkContainer>
                        </div>
                      </div>
                    </Carousel.Item>
                  );
                })
              }
            </Carousel>
          )
        }
      </div>
    </div>
  );
};

FeaturedGamesCarousel.defaultProps = {
  className: '',
  loading: false,
};

FeaturedGamesCarousel.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  games: PropTypes.arrayOf(PropTypes.shape({
    gameID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageCollection: PropTypes.array.isRequired,
  })),
};
