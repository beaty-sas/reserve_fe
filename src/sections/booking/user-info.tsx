'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import { useGetBusiness } from 'src/api/business';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { ICreateBooking } from 'src/types/order';
import { createNewBooking } from 'src/api/booking';
import { enqueueSnackbar } from 'src/components/snackbar';


// ----------------------------------------------------------------------

export default function UserInfoView({ id }: { id: number }) {
  const { business } = useGetBusiness(id);
  const searchParams = useSearchParams();
  const router = useRouter();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const NewOrderSchema = Yup.object().shape({
    name: Yup.string().required('Ім`я обов`язкове'),
    phone: Yup.string().required('Телефон обов`язковий').length(12, 'Не вірна кількість цифер').matches(phoneRegExp, 'Невірний формат телефону. 380XXXXXXXXX'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      phone: '380',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewOrderSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const bookingData: ICreateBooking = {
      start_time: searchParams.get('date') + 'T' + searchParams.get('time'),
      business_id: business.id,
      offers: searchParams.get('selected')?.split(',').map(Number) || [],
      user: {
        display_name: data.name,
        phone_number: data.phone,
      }
    } as ICreateBooking;

    try {
      await createNewBooking(bookingData);
      reset();
      router.push(`/booking/${business.id}/order/confirm?selected=${searchParams.get('selected')}&date=${searchParams.get('date')}&time=${searchParams.get('time')}&success=true`);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="name" label="Ім'я" />
        <RHFTextField name="phone" label="Телефон" />

      </Stack>

      <Box sx={{ p: 2 }}>
        <Button
          size="large"
          type="submit"
          color="inherit"
          fullWidth
          variant='contained'
        >
          Записатися
        </Button>
      </Box>
    </FormProvider>
  );
}
