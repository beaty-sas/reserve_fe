import { useLocation, useNavigate, useParams } from "react-router-dom";
import MDButton from "../components/MDButton";
import Header from "../layouts/booking/Header";
import PageLayout from "../layouts/containers/page";
import { useQuery } from "@tanstack/react-query";
import { getAvailableHours, getBusiness } from "../services/bookingPage";
import MDBox from "../components/MDBox";
import { Grid } from "@mui/material";
import MDInput from "../components/MDInput";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import dayjs from 'dayjs';
import { AvailableTime, BusinessOffer } from "../types/business";
import { useCreateOrder } from "../services/mutation";


function BookingConfirm() {
  const params = useParams();
  const { state } = useLocation()
  const navigate = useNavigate();
  const {
    data: business,
    isSuccess,
    isFetched,
  } = useQuery({
    queryFn: () => getBusiness(Number(params.id) as number),
    queryKey: ['business'],
  });

  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [selectedTime, setSelectedTime] = useState<string>()
  const [userName, setUserName] = useState<string>('')
  const [userPhone, setUserPhone] = useState<number>()

  const { data: availableHours } = useQuery({
    queryFn: () => getAvailableHours(Number(params.id) as number, {
      date: selectedDate,
      duration: state.selectedOffers.reduce((n: number, { duration }: { duration: number }) => n + duration, 0),
    }),
    queryKey: ['available-hours', selectedDate],
  });

  const startDateTime = `${selectedDate}T${selectedTime}`
  const selecterOfferIds: Array<number> = state.selectedOffers.map((offer: BusinessOffer) => offer.id)
  const { mutate } = useCreateOrder(
    startDateTime,
    Number(params.id) as number,
    selecterOfferIds,
    { display_name: userName, phone_number: String(userPhone) });

  if (!isSuccess || !isFetched) {
    return (<></>)
  }

  function handleCreateOrder() {
    mutate()
    navigate(`/booking/${params.id}/success`, { state: { ...state, selectedDate, selectedTime, business } })
  }

  return (
    <PageLayout>
      <Header business={business}>
        <MDBox mt={5} mb={3}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={(value) => setSelectedDate(dayjs(value).format('YYYY-MM-DD'))}
                disablePast={true}
              />
            </LocalizationProvider>
            {availableHours?.map(({ time }: AvailableTime) => (
              <MDButton
                key={time}
                variant={'gradient'}
                color={dayjs(time).format('HH:mm') === selectedTime ? "success" : "secondary"}
                size={'small'}
                style={{ marginRight: 5 }}
                onClick={() => setSelectedTime(dayjs(time).format('HH:mm'))}
              >
                {dayjs(time).format('HH:mm')}
              </MDButton>
            ))}
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    label="І'мя, Прізвище"
                    fullWidth
                    required
                    onChange={(event: any) => setUserName(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="number"
                    label="Телефон"
                    fullWidth
                    required
                    onChange={(event: any) => setUserPhone(event.target.value)}
                  />
                </MDBox>
              </MDBox>
            </MDBox>
          </Grid>
        </MDBox>
        <MDButton
          onClick={handleCreateOrder}
          rel="noreferrer"
          variant="outlined"
          size="large"
          color={"info"}
        >
          {"Підтвердити"}
        </MDButton>
      </Header>
    </PageLayout>
  );
}

export default BookingConfirm;
