import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { formatDate } from 'util/dates';
import selectors from './modules/selectors';
import * as actions from './modules/actions';

import './style.scss';

const GameDetail = props => {
  const {
    init,
    imageCollection,
    title,
    publisher,
    description,
    releaseDate,
    price,
    categories,
    features,
  } = props;

  
  const { id } = useParams();
  
  useEffect(() => {
    init(id);
  }, [id]);
  
  const formattedReleaseDate = formatDate(releaseDate);

  return (
    <div className="gs-detail">
      <Carousel className="gs-detail__carousel">
        {
          imageCollection.map(gi => {
            return (
              <Carousel.Item key={gi.imageID}>
                <Image className="d-block w-100" src={gi.url} alt={`Image-${gi.imageID}`} />
              </Carousel.Item>
            );
          })
        }
      </Carousel>
      <div className="gs-detail__content">
        <div className="d-flex justify-content-between">
          <h1>{title}</h1>
          <InputGroup className="w-auto">
            <InputGroup.Prepend>
              <InputGroup.Text className="font-weight-bold">${price}</InputGroup.Text>
            </InputGroup.Prepend>
            <Button className="pl-4 pr-4">PURCHASE</Button>
          </InputGroup>
        </div>
        <h5 className="text-muted">{publisher}</h5>
        <p className="mb-2 mt-4">{description}</p>
        <p className="text-muted text-right mb-5">Release Date: <span>{formattedReleaseDate}</span></p>
        <div className="d-flex justify-content-between">
          <div>
            <h6>Categories</h6>
            <div className="d-flex">
              {
                categories.map(c => <Badge className="mr-2" variant="primary">{c.categoryName}</Badge>)
              }
            </div>
          </div>
          <div>
            <h6>Features</h6>
            <div className="d-flex">
              {
                features.map(f => <Badge className="mr-2" variant="primary">{f.featureName}</Badge>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GameDetail.defaultProps = {
  imageCollection: [],
  title: '',
  publisher: '',
  description: '',
  releaseDate: '',
  price: 0.00,
  categories: [],
  features: [],
};

GameDetail.propTypes = {
  imageCollection: PropTypes.array,
  title: PropTypes.string,
  publisher: PropTypes.string,
  description: PropTypes.string,
  releaseDate: PropTypes.string,
  price: PropTypes.number,
  categories: PropTypes.array,
  features: PropTypes.array,
};

export default connect(state => {
  return selectors.selectPageState(state, 'detail');
}, {
  init: actions.initialize,
})(GameDetail);
