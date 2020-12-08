import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CaretDownFill } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { element } from 'util/bem';

import './style.scss';

export const FiltersSideBar = props => {
  const {
    className,
    categories,
    features,
  } = props;

  const cb = 'gs-filters-sidebar';

  const cn = classNames(
    className,
    cb,
  );

  return (
    <div className={cn}>
      <div>
        <h2>Filters</h2>
        <hr />
      </div>
      <Accordion defaultActiveKey="0">
        <Card className={element(cb, 'filters-section')}>
          <Accordion.Toggle
            className="d-flex justify-content-between"
            as={Card.Header}
            eventKey="0"
          >
            <h6>CATEGORIES</h6>
            <CaretDownFill />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {
                categories.map((c, i) => <p key={c.categoryID}>{c.categoryName}</p>)
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Card className={element(cb, 'filters-section')}>
          <Accordion.Toggle
            className="d-flex justify-content-between"
            as={Card.Header}
            eventKey="0"
          >
            <h6>FEATURES</h6>
            <CaretDownFill />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {
                features.map((f, i) => <p key={f.featureID}>{f.featureName}</p>)
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

FiltersSideBar.defaultProps = {
  className: '',
  categories: [],
  features: [],
};

FiltersSideBar.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.shape({
    categoryID: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
  })),
  features: PropTypes.arrayOf(PropTypes.shape({
    featureID: PropTypes.number.isRequired,
    featureName: PropTypes.string.isRequired,
  })),
};
