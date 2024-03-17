'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

import { makeNewAttachment, useGetBusiness } from 'src/api/business';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { ICreateBooking } from 'src/types/order';
import { createNewBooking } from 'src/api/booking';
import { enqueueSnackbar } from 'src/components/snackbar';
import { Upload } from 'src/components/upload';
import { IAttachment } from 'src/types/business';


type AttachemtnFile = {
  preview: string;
  attachment: IAttachment;
}

// ----------------------------------------------------------------------

export default function UserInfoView({ slug }: { slug: string }) {
  const { business } = useGetBusiness(slug);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const withPhoto = searchParams.get('withPhoto')
  const [attachments, setAttachments] = useState<Array<AttachemtnFile>>([]);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const NewOrderSchema = Yup.object().shape({
    name: Yup.string().required('Ім`я обов`язкове'),
    phone: Yup.string().required('Телефон обов`язковий').length(12, 'Не вірна кількість цифер').matches(phoneRegExp, 'Невірний формат телефону. 380XXXXXXXXX'),
    comment: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      phone: '380',
      comment: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewOrderSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const [hours, _] = (searchParams.get('time') ?? '').split(':');
    const localTime = new Date();
    localTime.setHours(Number(hours));
    const startTime = localTime.getUTCHours();

    const bookingData: ICreateBooking = {
      start_time: searchParams.get('date') + `T${String(startTime).length == 1 ? '0' + String(startTime) : String(startTime)}:00`,
      business_id: business.id,
      offers: searchParams.get('selected')?.split(',').map(Number) || [],
      user: {
        display_name: data.name,
        phone_number: data.phone,
      },
      comment: data.comment,
      attachments: attachments.map((item) => item.attachment.id),
    } as ICreateBooking;

    try {
      await createNewBooking(bookingData);
      reset();
      router.push(`/link/${slug}/order/confirm?selected=${searchParams.get('selected')}&date=${searchParams.get('date')}&time=${searchParams.get('time')}&success=true`);
    } catch (error) {
      enqueueSnackbar(error.detail[0].msg, { variant: 'error' });
    }
  });
  
  const handleDropMultiFile = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const attachment = await makeNewAttachment(file);
        setAttachments((prev) => [...prev, { preview: URL.createObjectURL(file), attachment: attachment }]);
      }

      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
    setAttachments(attachments.filter((item) => item.preview !== inputFile));
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="name" label="Ім'я" required />
        <RHFTextField name="phone" label="Телефон" required />
        <RHFTextField name="comment" label="Коментар" multiline />
        {withPhoto && <Upload
          multiple
          thumbnail
          files={files}
          onDrop={handleDropMultiFile}
          onRemove={handleRemoveFile}
          onUpload={() => console.info('ON UPLOAD')}
        />}
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
