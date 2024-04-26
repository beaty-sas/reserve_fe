'use client';

import { Box, Card, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ukUA } from '@mui/x-date-pickers/locales';
import { usePathname } from 'next/navigation';
import Image from 'src/components/image';
import { useSharedState } from 'src/hooks/state';


interface Props {
  children: React.ReactNode;
  summary: React.ReactNode;
  info: React.ReactNode;
  steps: React.ReactNode;
  params: { slug: string };
}

export default function BookingLayout({ children, info, summary, steps, params }: Props) {
  const { selectedOffers } = useSharedState();
  const pathname = usePathname()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (pathname === `/link/${params.slug}/confirm/`) {
    return (
      <Grid container sx={{ pt: 2, minHeight: '100vh' }} justifyContent={'center'} alignItems={'center'}>
        <Grid xs={12} md={6} item>
          {info}
          {summary}
        </Grid>
      </Grid>
    )
  }

  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        justifyContent={'space-between'}
      >
        <Grid container sx={{ pt: 2 }} justifyContent={'space-between'}>
          <Grid xs={12} md={6} item>
            {info}
            {selectedOffers.length && !isMobile ? summary : null}
          </Grid>

          <Grid xs={12} md={6} item sx={{ mb: isMobile ? 12 : null }}>
            <Card sx={{ ml: { md: 2 } }}>
              {children}
            </Card>
          </Grid>
        </Grid>

        <Box pt={2}>
          {!isMobile ? steps : null}
          <Grid container alignItems={'center'} justifyContent={'center'} pb={2}>
            <Typography variant="subtitle1" color={theme.palette.grey[400]} mr={1}>
              Працює на
            </Typography>
            <Image src={'/assets/logo.svg'} alt={'logo'} sx={{ width: 40, height: 40 }} />
          </Grid>
        </Box>
      </Box>
    </MuiLocalizationProvider >
  )
}