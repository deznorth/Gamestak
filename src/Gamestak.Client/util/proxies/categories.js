import axios from 'axios';

export const getCategories = async () => await axios.get('/api/game/categories');
