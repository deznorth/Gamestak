import axios from 'axios';

// GET
export const getGames = async filters => await axios.get('/api/game', { params: filters });

export const getFeaturedGames = async () => await axios.get('/api/game/featured');

// POST
export const featureGame = async (id) => await axios.post(`/api/game/featured/${id}`);

// DELETE
export const unfeatureGame = async (id) => await axios.delete(`/api/game/featured/${id}`);
