import * as yup from 'yup';
import { inventoryItemValidationSchema } from 'validationSchema/inventory-items';
import { wasteItemValidationSchema } from 'validationSchema/waste-items';

export const supermarketValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  inventory_item: yup.array().of(inventoryItemValidationSchema),
  waste_item: yup.array().of(wasteItemValidationSchema),
});
