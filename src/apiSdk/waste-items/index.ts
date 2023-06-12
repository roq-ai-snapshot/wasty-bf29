import axios from 'axios';
import queryString from 'query-string';
import { WasteItemInterface, WasteItemGetQueryInterface } from 'interfaces/waste-item';
import { GetQueryInterface } from '../../interfaces';

export const getWasteItems = async (query?: WasteItemGetQueryInterface) => {
  const response = await axios.get(`/api/waste-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWasteItem = async (wasteItem: WasteItemInterface) => {
  const response = await axios.post('/api/waste-items', wasteItem);
  return response.data;
};

export const updateWasteItemById = async (id: string, wasteItem: WasteItemInterface) => {
  const response = await axios.put(`/api/waste-items/${id}`, wasteItem);
  return response.data;
};

export const getWasteItemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/waste-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWasteItemById = async (id: string) => {
  const response = await axios.delete(`/api/waste-items/${id}`);
  return response.data;
};
