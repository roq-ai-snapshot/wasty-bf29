import * as yup from 'yup';

export const wasteItemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.number().integer().required(),
  supermarket_id: yup.string().nullable().required(),
});
