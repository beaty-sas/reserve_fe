'use client'

import Box from '@mui/material/Box';
import { Avatar, Card, ListItemText, Stack, Tab, useTheme } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import { useGetBusiness } from 'src/api/business';
import { bgGradient } from 'src/theme/css';


export default function InfoPage({ params }: { params: { slug: string } }) {
  const theme = useTheme();
  const { business } = useGetBusiness(params.slug);


  return (
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
            color: alpha(theme.palette.secondary.dark, 0),
            imgUrl: business?.banner?.original ?? '',
          }),
          height: 0.95,
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
          value={false}
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
          <Tab key={1} icon={<LocationOnIcon />} label={business?.location?.name} value={1} />
          <Tab key={2} icon={<LocalPhoneIcon />} label={business?.phone_number} value={2} />
        </Tabs>
      </Box>
    </Card>
  );
}
