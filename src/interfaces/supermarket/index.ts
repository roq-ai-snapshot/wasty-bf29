import { InventoryItemInterface } from 'interfaces/inventory-item';
import { WasteItemInterface } from 'interfaces/waste-item';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SupermarketInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  inventory_item?: InventoryItemInterface[];
  waste_item?: WasteItemInterface[];
  user?: UserInterface;
  _count?: {
    inventory_item?: number;
    waste_item?: number;
  };
}

export interface SupermarketGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  tenant_id?: string;
}
