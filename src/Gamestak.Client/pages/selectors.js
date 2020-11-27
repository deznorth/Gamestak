import debug from 'debug';

const log = debug('selectors:shared');

export const commonSelectors = {
  selectState: state => state,
};

export const createSelectors = additionalSelectors => ({
  ...commonSelectors,
  ...additionalSelectors,
});
