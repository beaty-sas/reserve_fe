'use client';

import { Box, Button, Card, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSharedState } from "src/hooks/state";
import { useRouter } from "next/navigation";
import { useCallback } from "react";


type Props = {
  params: {
    slug: string;
  };
};

export default function SummaryPage({ params }: Props) {
  const { selectedOffers } = useSharedState();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const goNext = useCallback(() => {
    router.push(`/link/${params.slug}/time-slot`);
  }, [selectedOffers, router, params.slug])

  if (isMobile) {
    return (
      <Stack
        sx={{
          position: 'fixed',
          width: '100%',
          bottom: 1,
          p: 2,
          ml: -2,
          zIndex: 100,
          backgroundColor: 'background.paper',
        }}
      >
        <Button
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

      <Stack sx={{ pr: 4, pl: 2 }}>
        <Button
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
