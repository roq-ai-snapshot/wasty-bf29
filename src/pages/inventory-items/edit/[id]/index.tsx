import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getInventoryItemById, updateInventoryItemById } from 'apiSdk/inventory-items';
import { Error } from 'components/error';
import { inventoryItemValidationSchema } from 'validationSchema/inventory-items';
import { InventoryItemInterface } from 'interfaces/inventory-item';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SupermarketInterface } from 'interfaces/supermarket';
import { getSupermarkets } from 'apiSdk/supermarkets';

function InventoryItemEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<InventoryItemInterface>(
    () => (id ? `/inventory-items/${id}` : null),
    () => getInventoryItemById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: InventoryItemInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateInventoryItemById(id, values);
      mutate(updated);
      resetForm();
      router.push('/inventory-items');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<InventoryItemInterface>({
    initialValues: data,
    validationSchema: inventoryItemValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Inventory Item
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="quantity" mb="4" isInvalid={!!formik.errors?.quantity}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                name="quantity"
                value={formik.values?.quantity}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.quantity && <FormErrorMessage>{formik.errors?.quantity}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<SupermarketInterface>
              formik={formik}
              name={'supermarket_id'}
              label={'Select Supermarket'}
              placeholder={'Select Supermarket'}
              fetcher={getSupermarkets}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'inventory_item',
  operation: AccessOperationEnum.UPDATE,
})(InventoryItemEditPage);
