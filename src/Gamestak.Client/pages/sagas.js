import StoreSagas from './Store/modules/saga';
import GameDetailSagas from './GameDetail/modules/saga';

export default [
  ...StoreSagas,
  ...GameDetailSagas,
];