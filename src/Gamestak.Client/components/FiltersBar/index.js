import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import './style.scss';

export const FiltersBar = props => {
  const {
    className,
    searchTerm,
    sortBy,
    updateHandler,
  } = props;

  const cn = classNames(
    className,
    'gs-filer-bar',
  );

  return (
    <div className={cn}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Order By</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          className="gs-filer-bar__select"
          onChange={e => updateHandler('sortBy', e.target.value)}
          as="select"
          defaultValue={sortBy}
          custom
        >
          <option value={0}>Newer First</option>
          <option value={1}>Older First</option>
          <option value={2}>A-Z</option>
          <option value={3}>Z-A</option>
          <option value={4}>Price: Low to High</option>
          <option value={5}>Price: High to Low</option>
        </Form.Control>
      </InputGroup>
      <Form.Control
        className="gs-filer-bar__search"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => updateHandler('searchTerm', e.target.value)}
      />
    </div>
  );
};

FiltersBar.defaultProps = {
  className: '',
};

FiltersBar.propTypes = {
  className: PropTypes.string,
};
