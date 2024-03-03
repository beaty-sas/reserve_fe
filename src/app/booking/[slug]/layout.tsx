'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Card, Container, ListItemText, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ukUA } from '@mui/x-date-pickers/locales';


import { AvatarShape } from 'src/assets/illustrations';
import Image from 'src/components/image';
import { useGetBusiness } from 'src/api/business';


export default function BookingLayout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {
    const theme = useTheme();
    const { business } = useGetBusiness(params.slug);

    return (
        <MuiLocalizationProvider
            dateAdapter={AdapterDateFns}
            localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <Container maxWidth={'md'} sx={{pb: 2}}>
                <Card sx={{ textAlign: 'center', my: 1 }}>
                    <Box sx={{ position: 'relative' }}>
                        <AvatarShape
                            sx={{
                                left: 0,
                                right: 0,
                                zIndex: 10,
                                mx: 'auto',
                                bottom: -26,
                                position: 'absolute',
                            }}
                        />

                        <Avatar
                            alt={business?.display_name}
                            src={business?.logo?.thumbnail ?? business?.display_name}
                            sx={{
                                width: 74,
                                height: 74,
                                zIndex: 11,
                                left: 0,
                                right: 0,
                                bottom: -42,
                                mx: 'auto',
                                position: 'absolute',
                            }}
                        />

                        <Image
                            src={business?.banner?.original}
                            alt={business?.display_name}
                            ratio="6/4"
                            overlay={alpha(theme.palette.grey[900], 0.48)}
                        />
                    </Box>

                    <ListItemText
                        sx={{ mt: 7, mb: 1 }}
                        primary={business?.display_name}
                        secondary={<Typography variant='body2'><LocationOnIcon fontSize='inherit' sx={{ mr: 1 }} />{business?.location?.name}</Typography>}
                        primaryTypographyProps={{ typography: 'subtitle1' }}
                        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
                    />
                </Card>
                {children}
            </Container>
        </MuiLocalizationProvider>
    )
}