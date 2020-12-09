import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { Redirect } from 'react-router-dom';

import { GamesGrid } from 'components/GamesGrid';
import { FiltersBar } from 'components/FiltersBar';
import { FiltersSideBar } from 'components/FiltersSideBar';

import selectors from './modules/selectors';
import * as actions from './modules/actions';

import './style.scss';

const Library = props => {

  const {
    isLoadingGames,
    isLoadingFilters,
    categories,
    features,
    user,
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
    if (!!user)
    props.searchGames({
      ownerID: user?.userId,
      searchTerm,
      sortBy: parseInt(sortBy), // Ensure this is always an int
      categories: selectedCategories,
      features: selectedFeatures,
    });
  }, [JSON.stringify(user), searchTerm, sortBy, JSON.stringify(selectedCategories), JSON.stringify(selectedFeatures)]);

  const searchParamUpdateHandler = (param, value) => updateSearchParams({ param, value });

  const isAuthenticated = !!user;

  
  return isAuthenticated ? (
    <Container className="gs-library" fluid>
      <h1>My Library</h1>
      <FiltersBar searchTerm={searchTerm} sortBy={sortBy} updateHandler={searchParamUpdateHandler} />
      <div className="d-flex">
        <GamesGrid className="flex-grow-1" games={games} loading={isLoadingGames} />
        <FiltersSideBar
          className="pl-3 flex-grow-1"
          loading={isLoadingFilters}
          categories={categories}
          features={features}
          selectedCategories={selectedCategories}
          selectedFeatures={selectedFeatures}
          updateHandler={searchParamUpdateHandler}
        />
      </div>
    </Container>
  ) : (
    <Redirect push to="/" />
  );
};

export default connect(state => {
  const pageState = selectors.selectPageState(state, 'library');
  const isLoadingFeatured = pageState.loadingFeatured;
  const isLoadingGames = pageState.loadingGames;
  const isLoadingFilters = selectors.selectIsLoadingFilters(state);
  const categories = selectors.selectCategories(state);
  const features = selectors.selectFeatures(state);
  const user = selectors.selectCurrentUser(state);
  return {
    isLoadingFeatured,
    isLoadingGames,
    isLoadingFilters,
    featuredGames: pageState.featuredGames,
    games: pageState.games,
    categories,
    features,
    searchParams: pageState.searchParams,
    user,
  };
}, {
  init: actions.initialize,
  searchGames: actions.searchingGames,
  updateSearchParams: actions.updateSearchParams,
})(Library);
