import axios from 'axios';

export const getFeatures = async () => await axios.get('/api/game/features');
