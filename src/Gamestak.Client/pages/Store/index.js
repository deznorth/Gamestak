import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import { GamesGrid } from 'components/GamesGrid';
import { FiltersSideBar } from 'components/FiltersSideBar';

import selectors from './modules/selectors';
import * as actions from './modules/actions';

import './style.scss';

const getGamesList = count => {
  const games = [];

  for(let i = 0; i < count; i++) {
    const gameID = i + 1;
    games.push({
      gameID,
      title: `Game ${gameID}`,
      publisher: `Publisher ${gameID}`,
      description: `This is game ${gameID}`,
      price: 49.99,
      discountPrice: 19.99,
      discountRate: 0.4,
      thumbnailUrl: 'https://store.ubi.com/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/en_US/dw1ffc694a/images/large/5e849c6c5cdf9a21c0b4e731.jpg?sw=341&sh=450&sm=fit',
      releaseDate: '2020-11-12T00:00:00',
      isOnSale: Math.floor(Math.random() * 2) > 0,
    });
  }

  return games;
};

const Store = props => {

  const {
    games,
  } = props.state;

  // const games = getGamesList(8);

  const categories = [
    'Action',
    'Adventure',
    'Racing',
    'RPG',
    'Shooter',
    'Survival',
  ];
  const features = [
    'Single Player',
    'Multiplayer',
    'Co-op',
    'VR'
  ];

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
}), {
  init: actions.initialize,
  fetchGames: actions.fetchingGames,
})(Store);
