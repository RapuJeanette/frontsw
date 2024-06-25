// src/services/productoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const recomendarProductos = (evento) => {
    return axios.post(`${API_URL}/recomendar`, { evento });
};
