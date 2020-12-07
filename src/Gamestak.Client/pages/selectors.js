import debug from 'debug';

const log = debug('selectors:shared');

export const commonSelectors = {
  selectState: state => state,
  selectPageState: (state, page) => state.pages[page],
};

export const createSelectors = additionalSelectors => ({
  ...commonSelectors,
  ...additionalSelectors,
});
