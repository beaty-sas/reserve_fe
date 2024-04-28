'use client';

import isPast from 'date-fns/isPast';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import uk from 'date-fns/locale/uk';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import CardHeader from '@mui/material/CardHeader';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Card, Tooltip, Typography, useTheme } from '@mui/material';

import { useGetWorkingHours } from 'src/api/working-hours';
import { useSharedState } from 'src/hooks/state';


// ----------------------------------------------------------------------

export default function TimeSlotView({ slug }: { slug: string }) {
  const theme = useTheme();
  const { setSelectedDate, setSelectedTime, selectedTime, selectedDate, selectedOffers } = useSharedState();
  const [value, setValue] = useState<Date | null>(new Date());

  const formattedDate = value?.toISOString().split('T')[0];
  const offersDuration = selectedOffers.reduce((acc, offer) => acc + offer.duration, 0);
  const { workingHours } = useGetWorkingHours(slug, formattedDate ?? '', offersDuration ?? 3600);

  const morningTimes = ['7:00', '8:00', '9:00', '10:00', '11:00']
  const lunchTimes = ['12:00', '13:00', '14:00', '15:00', '16:00']
  const eveningTimes = ['17:00', '18:00', '19:00', '20:00', '21:00']
  const availableTimes = [
    { title: 'Ранок', times: morningTimes },
    { title: 'День', times: lunchTimes },
    { title: 'Вечір', times: eveningTimes }
  ]

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  }, []);


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
              setSelectedDate(newValue);
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
            pt: 2,
            pr: 2,
            bl: 2,
            pl: 2,
            pb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            minHeight: 60,
          }}
        >
          <Box flex={2}>
            <Typography variant="body1" noWrap>
              {time.title}
            </Typography>
          </Box>
          <Box flex={8} display={'flex'} flexWrap={'wrap'} overflow={'wrap'}>
            {time.times.map((time, index) => {
              const isAvailable = isTimeAvailable(time);

              return (
                <Box
                  key={index}
                  sx={{
                    ml: 1,
                    mb: 1,
                    borderWidth: 1,
                    border: isAvailable ? 1 : 0,
                    borderColor: theme.palette.primary.main,
                    borderRadius: 1,
                    width: 45,
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
    </Card>
  );
}
