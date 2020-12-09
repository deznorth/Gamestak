import axios from 'axios';

// READ
export const login = async user => await axios.post('/api/user/login', user);

// CREATE
export const register = async user => await axios.post('/api/user', user);