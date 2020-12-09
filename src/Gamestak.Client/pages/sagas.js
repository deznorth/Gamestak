import LibrarySagas from './Library/modules/saga';
import StoreSagas from './Store/modules/saga';
import GameDetailSagas from './GameDetail/modules/saga';

export default [
  ...StoreSagas,
  ...LibrarySagas,
  ...GameDetailSagas,
];