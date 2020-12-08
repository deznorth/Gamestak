import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import selectors from './modules/selectors';
import * as actions from './modules/actions';

const GameDetail = props => {
  const {
    init,
  } = props;

  const { id } = useParams();

  useEffect(() => {
    init(id);
  }, [id]);

  return (
    <div>
      Hello! {id}
    </div>
  );
};

export default connect(state => {
  return selectors.selectPageState(state, 'detail');
}, {
  init: actions.initialize,
})(GameDetail);
