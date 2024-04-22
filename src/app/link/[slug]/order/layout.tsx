'use client';

import { useSearchParams } from 'next/navigation';
import { Box, Card, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useGetBusiness } from 'src/api/business';
import { useGetOffers } from 'src/api/offer';


type Props = {
  children: React.ReactNode;
  params: { slug: string };
};


export default function BookingLayout({ children, params }: Props) {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const { business } = useGetBusiness(params.slug);
  const { offers } = useGetOffers(params.slug);

  const selectedOffers = searchParams.get('selected')?.split(',').map(Number);
  const selectionOffersObj = offers.filter((offer) => selectedOffers?.includes(offer.id));
  const isSuccess = searchParams.get('success');

  return (<>{children}</>)

  return (
    <Card>
      {isSuccess && <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <CheckCircleIcon fontSize='large' color='primary' />
      </Box>}

      <CardHeader
        title={isSuccess ? 'Ви записалися!' : 'Запис'}
        sx={{ mb: 2, pt: isSuccess ? 1 : 2 }}
        titleTypographyProps={{ align: 'center' }}
      />

      <Box
        sx={{
          mr: 2,
          ml: 2,
          p: 2,
          pl: 3,
          pr: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <Typography variant="h6" gutterBottom>
          Деталі
        </Typography>

        <Divider />

        <Box display={'flex'} mt={2} alignItems={'center'}>
          <Typography variant="body2" gutterBottom textAlign={'center'} display={'flex'} alignItems={'center'}>
            <AccessTimeIcon fontSize='medium' sx={{ mr: 1 }} />
            Коли
          </Typography>
          <Typography variant="h6" gutterBottom ml={2}>
            {searchParams.get('time')}
          </Typography>
          <Typography variant="h6" gutterBottom ml={2}>
            {searchParams.get('date')}
          </Typography>
        </Box>

        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="body2" gutterBottom textAlign={'center'} display={'flex'} alignItems={'center'}>
            <LocationOnIcon fontSize='medium' sx={{ mr: 1 }} />
            Де
          </Typography>
          <Typography variant="h6" gutterBottom ml={2}>
            {business?.location?.name}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom mt={3}>
          Послуги
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        {selectionOffersObj.map((offer) => (
          <Box key={offer.id} display={'flex'} alignItems={'center'}>
            <Typography variant="subtitle1" gutterBottom fontWeight={'bold'}>
              {offer.name}
            </Typography>
            <Typography variant="caption" gutterBottom ml={2}>
              {offer.price} грн
            </Typography>
            <Typography variant="caption" gutterBottom ml={2} color={'text.secondary'}>
              {`${Math.round(offer.duration / 60)} хв`}
            </Typography>
          </Box>
        ))}
      </Box>
      {children}
    </Card>
  )
}