import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import { GamesGrid } from 'components/GamesGrid';
import { FiltersSideBar } from 'components/FiltersSideBar';

import selectors from './modules/selectors';
import * as actions from './modules/actions';

import './style.scss';

const Store = props => {

  const {
    categories,
    features,
  } = props;

  const {
    games,
  } = props.state;

  useEffect(() => {
    props.init();
  }, []);

  return (
    <Container className="gs-store" fluid>
      <h1>Hello, World!</h1>
      <hr />
      <div className="d-flex">
        <GamesGrid className="flex-grow-1" games={games} />
        <FiltersSideBar
          className="pl-3 flex-grow-1"
          categories={categories}
          features={features}
        />
      </div>
    </Container>
  );
};

export default connect(state => ({
  state: selectors.selectPageState(state, 'store'),
  categories: selectors.selectCategories(state),
  features: selectors.selectFeatures(state),
}), {
  init: actions.initialize,
  fetchGames: actions.fetchingGames,
})(Store);
