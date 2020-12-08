import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CaretDownFill } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { element } from 'util/bem';

import './style.scss';

export const FiltersSideBar = props => {
  const {
    className,
    categories,
    features,
    selectedCategories,
    selectedFeatures,
    updateHandler,
  } = props;

  const cb = 'gs-filters-sidebar';

  const cn = classNames(
    className,
    cb,
  );

  const isSelectedCategory = id => selectedCategories.includes(id);
  const isSelectedFeature = id => selectedFeatures.includes(id);

  const categoryToggleHangler = id => {
    let updated = [];
    if (isSelectedCategory(id)) {
      updated = selectedCategories.filter(cid => cid !== id);
    } else {
      updated = selectedCategories;
      updated.push(id);
    }
    updateHandler('categories', updated);
  };

  const featureToggleHangler = id => {
    let updated = [];
    if (isSelectedFeature(id)) {
      updated = selectedFeatures.filter(fid => fid !== id);
    } else {
      updated = selectedFeatures;
      updated.push(id);
    }
    updateHandler('features', updated);
  }

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
                categories.map((c, i) => (
                  <Button
                    key={c.categoryID}
                    className={`text-left ${isSelectedCategory(c.categoryID) ? 'active-filter' : ''}`}
                    variant="text"
                    onClick={() => categoryToggleHangler(c.categoryID)}
                    block
                  >
                    {c.categoryName}
                  </Button>
                ))
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
                features.map((f, i) => (
                  <Button
                    key={f.featureID}
                    className={`text-left ${isSelectedFeature(f.featureID) ? 'active-filter' : ''}`}
                    variant="text"
                    onClick={() => featureToggleHangler(f.featureID)}
                    block
                  >
                    {f.featureName}
                  </Button>
                ))
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
  selectedCategories: [],
  selectedCategoriesSetter: () => {},
  selectedFeatures: [],
  selectedFeaturesSetter: () => {},
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
