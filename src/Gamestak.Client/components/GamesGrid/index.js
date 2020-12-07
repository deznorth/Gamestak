import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GameCard } from '../GameCard';

export const GamesGrid = props => {

  const {
    className,
    rowSize,
    games,
  } = props;

  const cn = classNames(
    className,
    'gs-games-grid',
  );

  const gameRows = [];

  while(games.length > 0) {
    gameRows.push(games.splice(0, rowSize));
  }

  return (
    <Container className={cn}>
      {
        gameRows.map((gr, i) => {
          const cols = gr.map(g => (
            <Col key={g.gameID}>
              <GameCard {...g} />
            </Col>
          ));
          
          let paddingKey = 0;
          while(cols.length < rowSize) {
            cols.push(<Col key={paddingKey}></Col>);
            paddingKey++;
          }

          return (
            <Row key={i}>
              {cols}
            </Row>
          );
        })
      }
    </Container>
  );
};

GamesGrid.defaultProps = {
  className: '',
  rowSize: 4,
  games: [],
};

GamesGrid.propTypes = {
  className: PropTypes.string,
  rowSize: PropTypes.number,
  games: PropTypes.array,
};
