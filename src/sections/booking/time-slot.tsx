'use client';

import isPast from 'date-fns/isPast';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import uk from 'date-fns/locale/uk';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useRouter, useSearchParams } from 'next/navigation';
import CardHeader from '@mui/material/CardHeader';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Button, Card, Tooltip, Typography, useTheme } from '@mui/material';

import { useGetWorkingHours } from 'src/api/working-hours';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function TimeSlotView({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();

  const [value, setValue] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const formattedDate = value?.toISOString().split('T')[0];
  const { workingHours } = useGetWorkingHours(slug, formattedDate ?? '', Number(searchParams.get('duration')) ?? 3600);

  const selectedOffers = searchParams.get('selected')?.split(',').map(Number);

  const morningTimes = ['7:00', '8:00', '9:00', '10:00', '11:00']
  const lunchTimes = ['12:00', '13:00', '14:00', '15:00', '16:00']
  const eveningTimes = ['17:00', '18:00', '19:00', '20:00', '21:00']
  const availableTimes = [
    { title: 'Ранок', times: morningTimes },
    { title: 'День', times: lunchTimes },
    { title: 'Вечір', times: eveningTimes }
  ]

  const isTimeAvailable = (time: string) => {
    return workingHours?.some((item) => {
      // Convert local time to UTC
      const localTime = new Date();
      const [hours, _] = item.time.split(':').map(Number);
      localTime.setUTCHours(hours);

      // Compare UTC times
      return time === localTime.getHours() + ':00';
    });;
  }

  function goNext() {
    const withPhoto = searchParams.get('withPhoto');
    router.push(`/link/${slug}/order/user-info?selected=${selectedOffers}&date=${formattedDate}&time=${selectedTime}&withPhoto=${withPhoto}`);
  }

  function goBack() {
    router.back();
  }

  return (
    <Card>
      <CardHeader
        title={'Запис'}
        sx={{ mb: 3 }}
        titleTypographyProps={{ variant: 'h2' }}
      />

      <Typography variant="h6" sx={{ mb: 1, ml: 3 }}>
        Оберіть дату
      </Typography>
      <Card sx={{ ml: 3, mr: 3, pt: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
          <DateCalendar<Date>
            openTo="day"
            value={value}
            disablePast={Boolean(isPast)}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            sx={{ textTransform: 'capitalize' }}
          />
        </LocalizationProvider>
      </Card>

      <Typography variant="h6" sx={{ mb: 1, ml: 3, mt: 2 }}>
        Оберіть час
      </Typography>

      {availableTimes.map((time, index) => (
        <Card
          key={index}
          sx={{
            ml: 3,
            mr: 3,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            minHeight: 60,
            pl: 2,
          }}
        >
          <Box flex={3}>
            <Typography variant="body1" noWrap>
              {time.title}
            </Typography>
          </Box>
          <Box flex={8} display={'flex'}>
            {time.times.map((time, index) => {
              const isAvailable = isTimeAvailable(time);

              return (
                <Box
                  key={index}
                  sx={{
                    ml: 1,
                    borderWidth: 1,
                    border: isAvailable ? 1 : 0,
                    borderColor: theme.palette.primary.main,
                    borderRadius: 1,
                    width: 50,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    opacity: isAvailable ? 1 : 0.3,
                    backgroundColor: selectedTime === time ? theme.palette.primary.main : null,
                  }}
                  onClick={() => isAvailable ? setSelectedTime(time) : null}
                >
                  <Tooltip title={isAvailable ? '' : 'Заброньовано'}>
                    <Typography
                      variant="caption"
                      noWrap
                      textAlign={'center'}
                      color={selectedTime === time ? 'white' : 'text.primary'}
                    >
                      {time}
                    </Typography>
                  </Tooltip>
                </Box>
              )
            })}
          </Box>
        </Card>
      ))}

      <Box sx={{ p: 2, textAlign: 'right', m: 1 }} display={'flex'}>
        <Button
          sx={{ flex: 1, mr: 2 }}
          size="large"
          color="primary"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
          fullWidth
          variant='outlined'
          onClick={goBack}
        >
          Назад
        </Button>
        <Button
          sx={{ flex: 4 }}
          size="large"
          color="primary"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          fullWidth
          variant='contained'
          onClick={goNext}
          disabled={!selectedTime}
        >
          Продовжити
        </Button>
      </Box>
    </Card>
  );
}
