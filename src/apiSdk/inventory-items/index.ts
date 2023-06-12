import axios from 'axios';
import queryString from 'query-string';
import { InventoryItemInterface, InventoryItemGetQueryInterface } from 'interfaces/inventory-item';
import { GetQueryInterface } from '../../interfaces';

export const getInventoryItems = async (query?: InventoryItemGetQueryInterface) => {
  const response = await axios.get(`/api/inventory-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInventoryItem = async (inventoryItem: InventoryItemInterface) => {
  const response = await axios.post('/api/inventory-items', inventoryItem);
  return response.data;
};

export const updateInventoryItemById = async (id: string, inventoryItem: InventoryItemInterface) => {
  const response = await axios.put(`/api/inventory-items/${id}`, inventoryItem);
  return response.data;
};

export const getInventoryItemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/inventory-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInventoryItemById = async (id: string) => {
  const response = await axios.delete(`/api/inventory-items/${id}`);
  return response.data;
};
