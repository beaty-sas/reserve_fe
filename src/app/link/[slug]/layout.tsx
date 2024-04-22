'use client';

import Box from '@mui/material/Box';
import { Avatar, Card, Grid, ListItemText, Stack, Tab, useTheme } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ukUA } from '@mui/x-date-pickers/locales';

import { useGetBusiness } from 'src/api/business';
import { bgGradient } from 'src/theme/css';


export default function BookingLayout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {
  const theme = useTheme();
  const { business } = useGetBusiness(params.slug);

  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Grid container sx={{ pt: 2 }} justifyContent={'space-between'}>
        <Grid xs={12} md={6}>
          <Card
            sx={{
              height: 290,
              mr: { md: 2 },
              mb: 2,
            }}
          >
            <Box
              sx={{
                ...bgGradient({
                  color: alpha(theme.palette.secondary.dark, 0.7),
                  imgUrl: business?.banner?.original ?? '',
                }),
                height: 1,
                color: 'common.white',
              }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{
                  left: { md: 24 },
                  bottom: { md: 24 },
                  zIndex: { md: 10 },
                  pt: { xs: 6, md: 0 },
                  position: { md: 'absolute' },
                }}
              >
                <Avatar
                  alt={business?.display_name}
                  src={business?.logo?.thumbnail ?? business?.display_name}
                  sx={{
                    mx: 'auto',
                    width: { xs: 64, md: 128 },
                    height: { xs: 64, md: 128 },
                    border: `solid 2px ${theme.palette.common.white}`,
                  }}
                >
                  {business?.display_name?.charAt(0).toUpperCase()}
                </Avatar>

                <ListItemText
                  sx={{
                    mt: 3,
                    ml: { md: 3 },
                    textAlign: { xs: 'center', md: 'unset' },
                  }}
                  primary={business?.display_name}
                  primaryTypographyProps={{
                    typography: 'h4',
                  }}
                  secondaryTypographyProps={{
                    mt: 0.5,
                    color: 'inherit',
                    component: 'span',
                    typography: 'body2',
                    sx: { opacity: 0.48 },
                  }}
                />
              </Stack>
              <Tabs
                value={'currentTab'}
                onChange={() => { }}
                sx={{
                  width: 1,
                  bottom: 0,
                  zIndex: 9,
                  position: 'absolute',
                  bgcolor: 'background.paper',
                  [`& .${tabsClasses.flexContainer}`]: {
                    pr: { md: 3 },
                    justifyContent: {
                      sm: 'center',
                      md: 'flex-end',
                    },
                  },
                }}
              >
                <Tab key={1} icon={<LocationOnIcon />} label={business?.location?.name} />
                <Tab key={2} icon={<LocalPhoneIcon />} label={business?.phone_number} />
              </Tabs>
            </Box>
          </Card>
        </Grid>

        {children}

      </Grid>
    </MuiLocalizationProvider >
  )
}