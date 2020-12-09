import axios from 'axios';

// READ
export const getGames = async filters => await axios.post('/api/game/search', filters);

export const getGameByID = async id => await axios.get(`/api/game/${id}`);

export const getFeaturedGames = async () => await axios.get('/api/game/featured');

export const getGameKey = async (userId, gameId) => await axios.get('/api/game/key', { params: { userId, gameId } });

// CREATE
export const featureGame = async (id) => await axios.post(`/api/game/featured/${id}`);

// DELETE
export const unfeatureGame = async (id) => await axios.delete(`/api/game/featured/${id}`);
