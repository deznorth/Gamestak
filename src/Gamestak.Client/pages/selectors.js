
export const commonSelectors = {
  selectState: state => state,
  selectShared: state => state.shared,
  selectPageState: (state, page) => state.pages[page],
  selectCurrentUser: state => commonSelectors.selectShared(state)?.currentUser,

  // Shared
  selectIsLoadingFilters: state => commonSelectors.selectShared(state)?.loadingFilters,
  selectCategories: state => commonSelectors.selectShared(state)?.categories,
  selectFeatures: state => commonSelectors.selectShared(state)?.features,
  selectShownModal: state => commonSelectors.selectShared(state)?.shownModal,
  selectShoppingCart: state => commonSelectors.selectShared(state)?.shoppingCart,
  selectIsOnCart: (state, id) => !!commonSelectors.selectShoppingCart(state)?.find(i => parseInt(i.gameID) === id),
  
  // User
  selectIsAuthenticated: state => !!commonSelectors.selectCurrentUser(state),
  selectOwnedGames: state => commonSelectors.selectCurrentUser(state)?.ownedGames,
  selectIsOwnedGame: (state, id) => commonSelectors.selectOwnedGames(state)?.includes(parseInt(id)),
  selectRole: state => commonSelectors.selectCurrentUser(state)?.role,
  selectIsAdmin: state => commonSelectors.selectRole(state)?.managementAccess === true,

  // Errors
  selectLoginFailure: state => commonSelectors.selectShared(state)?.loginError,
  selectRegisterFailure: state => commonSelectors.selectShared(state)?.registerError,
  selectCheckoutFailure: state => commonSelectors.selectShared(state)?.checkoutError,
};

export const createSelectors = additionalSelectors => ({
  ...commonSelectors,
  ...additionalSelectors,
});
