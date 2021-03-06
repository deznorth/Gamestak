import axios from 'axios';

// READ
export const getGames = async filters => await axios.post('/api/game/search', filters);

export const getGameByID = async id => await axios.get(`/api/game/${id}`);

export const getFeaturedGames = async () => await axios.get('/api/game/featured');

export const getGameKey = async (userId, gameId) => await axios.get('/api/game/key', { params: { userId, gameId } });

export const getOwnedGames = async userId => await axios.get('/api/game/owned', { params: { userId } });

// CREATE
export const featureGame = async (id) => await axios.post(`/api/game/featured/${id}`);

export const checkoutGames = async cart => await axios.post('/api/game/key', cart);

// DELETE
export const unfeatureGame = async (id) => await axios.delete(`/api/game/featured/${id}`);
