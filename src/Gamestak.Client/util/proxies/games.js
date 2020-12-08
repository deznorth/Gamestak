import axios from 'axios';

export const getGames = async () => await axios.get('/api/game');