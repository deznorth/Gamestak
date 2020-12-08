
export const commonSelectors = {
  selectState: state => state,
  selectShared: state => state.shared,
  selectPageState: (state, page) => state.pages[page],
  
  selectIsLoadingFilters: state => commonSelectors.selectShared(state).loadingFilters,
  selectCategories: state => commonSelectors.selectShared(state).categories,
  selectFeatures: state => commonSelectors.selectShared(state).features,
};

export const createSelectors = additionalSelectors => ({
  ...commonSelectors,
  ...additionalSelectors,
});
