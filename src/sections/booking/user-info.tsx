'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Card, CardHeader, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { makeNewAttachment } from 'src/api/business';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { Upload } from 'src/components/upload';
import { useSharedState } from 'src/hooks/state';

// ----------------------------------------------------------------------

export default function UserInfoView() {
  const { selectedOffers, attachments, setAttachments, setComment, setUserName, setUserPhone, userName, userPhone, comment } = useSharedState();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const withPhoto = selectedOffers.some((offer) => offer.allow_photo);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const NewOrderSchema = Yup.object().shape({
    name: Yup.string().required('Ім`я обов`язкове'),
    phone: Yup.string().required('Телефон обов`язковий').length(12, 'Не вірна кількість цифер').matches(phoneRegExp, 'Невірний формат телефону. 380XXXXXXXXX'),
    comment: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: userName ?? '',
      phone: userPhone ?? '380',
      comment: comment ?? '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewOrderSchema),
    defaultValues,
  });

  const { watch } = methods;
  const commentWatch = watch('comment');
  const userNameWatch = watch('name');
  const userPhoneWatch = watch('phone');

  useEffect(() => {
    setComment(commentWatch ?? '');
  }, [commentWatch, setComment]);

  useEffect(() => {
    setUserName(userNameWatch ?? '');
  }, [userNameWatch, setUserName]);


  useEffect(() => {
    const userPhoneWatch = watch('phone');
    setUserPhone(userPhoneWatch ?? '');
  }, [userPhoneWatch, setUserPhone]);

  const handleDropMultiFile = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const attachment = await makeNewAttachment(file);
        setAttachments([...attachments, { preview: URL.createObjectURL(file), attachment: attachment }]);
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
    <Card>
      <CardHeader title={'Ваші дані'} sx={{ mb: 3 }} titleTypographyProps={{ variant: 'h2' }} />

      <FormProvider methods={methods}>
        <Stack spacing={2} sx={{ p: 3 }}>
          <RHFTextField name="name" label="Ім'я" required />
          <RHFTextField name="phone" label="Номер телефону" required />
          <RHFTextField name="comment" label="Коментар до запису" multiline minRows={3} />

          {withPhoto && <Typography variant="h6">
            Завантажте фото за необхідності
          </Typography>}

          {withPhoto && <Upload
            multiple
            thumbnail
            files={files}
            onDrop={handleDropMultiFile}
            onRemove={handleRemoveFile}
          />}
        </Stack>
      </FormProvider>
    </Card>
  );
}
