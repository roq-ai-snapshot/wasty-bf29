import axios from 'axios';
import queryString from 'query-string';
import { SupermarketInterface, SupermarketGetQueryInterface } from 'interfaces/supermarket';
import { GetQueryInterface } from '../../interfaces';

export const getSupermarkets = async (query?: SupermarketGetQueryInterface) => {
  const response = await axios.get(`/api/supermarkets${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSupermarket = async (supermarket: SupermarketInterface) => {
  const response = await axios.post('/api/supermarkets', supermarket);
  return response.data;
};

export const updateSupermarketById = async (id: string, supermarket: SupermarketInterface) => {
  const response = await axios.put(`/api/supermarkets/${id}`, supermarket);
  return response.data;
};

export const getSupermarketById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/supermarkets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSupermarketById = async (id: string) => {
  const response = await axios.delete(`/api/supermarkets/${id}`);
  return response.data;
};
