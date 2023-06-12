import { SupermarketInterface } from 'interfaces/supermarket';
import { GetQueryInterface } from 'interfaces';

export interface InventoryItemInterface {
  id?: string;
  name: string;
  quantity: number;
  supermarket_id: string;
  created_at?: any;
  updated_at?: any;

  supermarket?: SupermarketInterface;
  _count?: {};
}

export interface InventoryItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  supermarket_id?: string;
}
