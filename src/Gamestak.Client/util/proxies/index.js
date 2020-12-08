import * as CategoriesProxy from './categories';
import * as FeaturesProxy from './features';
import * as GamesProxy from './games';

// Root Proxy
export default {
  ...CategoriesProxy,
  ...FeaturesProxy,
  ...GamesProxy,
};