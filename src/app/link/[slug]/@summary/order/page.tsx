'use client';

import { Box, Button, Card, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useSharedState } from "src/hooks/state";
import { useGetBusiness } from "src/api/business";
import { ICreateBooking } from "src/types/order";
import { createNewBooking } from "src/api/booking";
import { enqueueSnackbar } from "notistack";


type Props = {
  params: {
    slug: string;
  };
};

export default function SummaryPage({ params }: Props) {
  const { selectedOffers, selectedDate, selectedTime, userName, userPhone, comment, attachments } = useSharedState();
  const { business } = useGetBusiness(params.slug);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const goNext = useCallback(async () => {
    const myDate = new Date(selectedDate);
    myDate.setHours(Number(selectedTime.split(':')[0]));
    myDate.setMinutes(0);
    myDate.setSeconds(0);

    const bookingData: ICreateBooking = {
      start_time: myDate.toISOString(),
      business_id: business.id,
      offers: selectedOffers?.map((offer) => offer.id),
      user: {
        display_name: userName,
        phone_number: userPhone,
      },
      comment: comment,
      attachments: attachments.map((item) => item.attachment.id),
    } as ICreateBooking;

    try {
      await createNewBooking(bookingData);
      router.push(`/link/${params.slug}/confirm`);
    } catch (error) {
      enqueueSnackbar(error.detail[0].msg, { variant: 'error' });
    }
  }, [selectedTime, selectedDate, selectedOffers, business, userName, userPhone, comment, attachments, params.slug, router]);


  if (isMobile) {
    return (
<Stack
        sx={{
          p: 2,
          pr: 4,
          pl: 2,
          position: 'fixed',
          width: '100%',
          bottom: 1,
          ml: -2,
          zIndex: 100,
          backgroundColor: 'background.paper',
        }}
        direction={'row'}
      >
        <Button
          sx={{ flex: 1, mr: 2 }}
          size="large"
          color="primary"
          fullWidth
          variant='outlined'
          onClick={() => router.back()}
        >
          Назад
        </Button>
        <Button
          sx={{ flex: 11 }}
          size="large"
          color="primary"
          fullWidth
          variant='contained'
          onClick={goNext}
        >
          Продовжити
        </Button>
      </Stack>
    )
  }


  return (
    <Box>
      <Card
        sx={{
          mr: { md: 2 },
          mb: 2,
          p: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Деталі
        </Typography>

        <Box display={'flex'} mt={2} alignItems={'center'}>
          <Typography variant="body1" gutterBottom textAlign={'center'} display={'flex'} alignItems={'center'}>
            <AccessTimeIcon fontSize='medium' sx={{ mr: 1 }} />
            Коли
          </Typography>
          <Typography variant="body1" gutterBottom ml={2}>
            {selectedTime}
          </Typography>
          <Typography variant="body1" gutterBottom ml={2}>
            {new Date(selectedDate).toLocaleDateString().replaceAll('/', '-')}
          </Typography>
        </Box>

        <Box display={'flex'} alignItems={'center'}>
          <Typography variant="body1" gutterBottom textAlign={'center'} display={'flex'} alignItems={'center'}>
            <LocationOnIcon fontSize='medium' sx={{ mr: 1 }} />
            Де
          </Typography>
          <Typography variant="body1" gutterBottom ml={2}>
            {business?.location?.name}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom mt={3}>
          Обрані послуги
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        {selectedOffers.map((offer) => (
          <Box key={offer.id} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="body1" gutterBottom>
              {offer.name}
            </Typography>
            <Box display={'flex'}>
              <Typography variant="body2" gutterBottom ml={2}>
                {offer.price} ₴
              </Typography>
              <Typography variant="body2" gutterBottom ml={2} color={'text.secondary'}>
                {`${Math.round(offer.duration / 60)} хв`}
              </Typography>
            </Box>
          </Box>
        ))}
      </Card>

      <Divider sx={{ mt: 3, mb: 3, mr: 2, borderStyle: 'dashed' }} />

      <Stack
        sx={{
          pr: 4,
          pl: 2,
          bottom: 1,
          zIndex: 100,
          backgroundColor: 'background.paper',
        }}
        direction={'row'}
      >
        <Button
          sx={{ flex: 1, mr: 2 }}
          size="large"
          color="primary"
          fullWidth
          variant='outlined'
          onClick={() => router.back()}
        >
          Назад
        </Button>
        <Button
          sx={{ flex: 11 }}
          size="large"
          color="primary"
          fullWidth
          variant='contained'
          onClick={goNext}
        >
          Продовжити
        </Button>
      </Stack>
    </Box>
  );
}
