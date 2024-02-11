import { useLocation } from "react-router-dom";
import Header from "../layouts/booking/Header";
import PageLayout from "../layouts/containers/page";
import MDBox from "../components/MDBox";
import { Grid } from "@mui/material";
import MDTypography from "../components/MDTypography";
import { BusinessOffer } from "../types/business";


function BookingSuccess() {
  const { state } = useLocation()

  return (
    <PageLayout>
      <Header business={state.business}>
        <MDBox mt={5} mb={3}>
          <Grid item xs={12}>
            <MDTypography>Ваша заявка прийнята.</MDTypography>
            <MDTypography>Телефон: {state.business.phone_number}</MDTypography>
            <MDTypography>Адреса: {state.business.location.name}</MDTypography>
            <MDTypography>Дата: {state.selectedDate} Час: {state.selectedTime}</MDTypography>
            <MDTypography>Вибрані послуги: {state.selectedOffers.map((offer: BusinessOffer) => offer.name).join(', ')} </MDTypography>
          </Grid>
        </MDBox>
      </Header>
    </PageLayout>
  );
}

export default BookingSuccess;
