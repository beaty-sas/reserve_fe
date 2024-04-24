'use client';

import { Card, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ukUA } from '@mui/x-date-pickers/locales';
import { useSharedState } from 'src/hooks/state';


interface Props {
  children: React.ReactNode;
  summary: React.ReactNode;
  info: React.ReactNode;
  params: { slug: string };
}

export default function BookingLayout({ children, info, summary }: Props) {
  const { selectedOffers } = useSharedState();

  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Grid container sx={{ pt: 2 }} justifyContent={'space-between'}>
        <Grid xs={12} md={6} item>
          {info}
          {selectedOffers.length ? summary : null}
        </Grid>

        <Grid xs={12} md={6} item sx={{ mb: mobile ? 12 : null }}>
          <Card sx={{ ml: { md: 2 } }}>
            {children}
          </Card>
        </Grid>

      </Grid>
    </MuiLocalizationProvider >
  )
}