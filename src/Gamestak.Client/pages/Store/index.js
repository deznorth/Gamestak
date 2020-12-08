import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import { FeaturedGamesCarousel } from 'components/FeaturedGamesCarousel';
import { GamesGrid } from 'components/GamesGrid';
import { FiltersBar } from 'components/FiltersBar';
import { FiltersSideBar } from 'components/FiltersSideBar';

import selectors from './modules/selectors';
import * as actions from './modules/actions';

import './style.scss';

const Store = props => {

  const {
    categories,
    features,
    featuredGames,
    games,
  } = props;

  useEffect(() => {
    props.init();
  }, []);

  const handleSearch = ({ searchTerm, sortBy }) => {
    props.searchGames({
      searchTerm,
      sortBy,
    });
  };

  return (
    <Container className="gs-store" fluid>
      {
        featuredGames && <FeaturedGamesCarousel games={featuredGames} />
      }
      <FiltersBar searchHandler={handleSearch} />
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

export default connect(state => {
  const pageState = selectors.selectPageState(state, 'store');
  const categories = selectors.selectCategories(state);
  const features = selectors.selectFeatures(state);
  return {
    state,
    featuredGames: pageState.featuredGames,
    games: pageState.games,
    categories,
    features,
  };
}, {
  init: actions.initialize,
  fetchGames: actions.fetchingGames,
  searchGames: actions.searchingGames,
})(Store);
