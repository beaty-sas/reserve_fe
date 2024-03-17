'use client';

import isPast from 'date-fns/isPast';
import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import CardHeader from '@mui/material/CardHeader';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Button, Card, Typography, useTheme } from '@mui/material';

import { useGetWorkingHours } from 'src/api/working-hours';


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

  return (
    <Card>
      <CardHeader
        title={'Запис'}
        sx={{ mb: 2 }}
        titleTypographyProps={{ align: 'center' }}
      />

      <Typography variant="subtitle1" sx={{ mb: 1 }} align='center'>
        Дата
      </Typography>
      <DateCalendar<Date>
        openTo="day"
        value={value}
        disablePast={Boolean(isPast)}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />

      <Typography variant="subtitle1" sx={{ mb: 1 }} align='center'>
        Час
      </Typography>

      {availableTimes.map((time, index) => (
        <Box
          key={index}
          sx={{
            ml: 'auto',
            mr: 'auto',
            mb: 2,
            maxWidth: 320,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            minHeight: 60,
            pl: 2,
            borderRadius: '16px',
            backgroundColor: theme.palette.grey[200],
          }}
        >
          <Box flex={1}>
            <Typography variant="subtitle1" noWrap fontWeight={'bold'} mr={1}>
              {time.title}
            </Typography>
          </Box>
          <Box flex={4} display={'flex'}>
            {time.times.map((time, index) => {
              const isAvailable = isTimeAvailable(time);

              return (
                <Box
                  key={index}
                  sx={{
                    ml: 1,
                    borderWidth: 1,
                    border: isAvailable ? 1 : 0,
                    borderRadius: '50%',
                    borderColor: theme.palette.grey[400],
                    width: 38,
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    opacity: isAvailable ? 1 : 0.3,
                    backgroundColor: selectedTime === time ? theme.palette.primary.main : theme.palette.grey[200],
                  }}
                  onClick={() => isAvailable ? setSelectedTime(time) : null}
                >
                  <Typography variant="caption" noWrap fontWeight={'600'} textAlign={'center'}>
                    {time}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
      ))}

      <Box sx={{ p: 2 }}>
        <Button
          size="large"
          color="inherit"
          fullWidth
          variant='contained'
          onClick={goNext}
        >
          Підтвердити
        </Button>
      </Box>
    </Card>
  );
}
