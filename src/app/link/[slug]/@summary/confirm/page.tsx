'use client';

import { Box, Card, Divider, Typography } from "@mui/material";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useSharedState } from "src/hooks/state";
import { useGetBusiness } from "src/api/business";


type Props = {
  params: {
    slug: string;
  };
};

export default function SummaryPage({ params }: Props) {
  const { selectedOffers, selectedDate, selectedTime } = useSharedState();
  const { business } = useGetBusiness(params.slug);

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mb={2}>
        <CheckCircleIcon fontSize='large' color='success' />
        <Typography variant="h4" ml={2}>
          Ви записалися!
        </Typography>
      </Box>
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

    </Box>
  );
}
