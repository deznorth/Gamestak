import React, { useEffect, useState } from 'react';
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
    searchParams: {
      searchTerm,
      sortBy,
      categories: selectedCategories,
      features: selectedFeatures,
    },
    updateSearchParams,
  } = props;

  useEffect(() => {
    props.init();
  }, []);

  useEffect(() => {
    props.searchGames({
      searchTerm,
      sortBy: parseInt(sortBy), // Ensure this is always an int
      categories: selectedCategories,
      features: selectedFeatures,
    });
  }, [searchTerm, sortBy, JSON.stringify(selectedCategories), JSON.stringify(selectedFeatures)]);

  const searchParamUpdateHandler = (param, value) => updateSearchParams({ param, value });

  return (
    <Container className="gs-store" fluid>
      {
        featuredGames && <FeaturedGamesCarousel games={featuredGames} />
      }
      <FiltersBar searchTerm={searchTerm} sortBy={sortBy} updateHandler={searchParamUpdateHandler} />
      <div className="d-flex">
        <GamesGrid className="flex-grow-1" games={games} />
        <FiltersSideBar
          className="pl-3 flex-grow-1"
          categories={categories}
          features={features}
          selectedCategories={selectedCategories}
          selectedFeatures={selectedFeatures}
          updateHandler={searchParamUpdateHandler}
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
    featuredGames: pageState.featuredGames,
    games: pageState.games,
    categories,
    features,
    searchParams: pageState.searchParams,
  };
}, {
  init: actions.initialize,
  fetchGames: actions.fetchingGames,
  searchGames: actions.searchingGames,
  updateSearchParams: actions.updateSearchParams,
})(Store);
