import axios from 'axios';

const API_URL = 'http://localhost:8080/api/autores';

export const getAutores = () => axios.get(API_URL);