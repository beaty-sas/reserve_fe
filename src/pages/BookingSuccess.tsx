import { useLocation } from "react-router-dom";
import Header from "../layouts/booking/Header";
import PageLayout from "../layouts/containers/page";
import MDBox from "../components/MDBox";
import { Grid } from "@mui/material";
import MDTypography from "../components/MDTypography";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function BookingSuccess() {
  const { state } = useLocation()

  return (
    <PageLayout>
      <MDBox
        width="90vw"
        sx={{ margin: 'auto', marginTop: 3 }}
      >
        <Header business={state.business}>
          <Grid container justifyContent={'center'} alignItems={'center'} mt={3}>
            <MDBox sx={{display: 'flex'}}>
              <CheckCircleIcon color="success" fontSize="large"/>
            </MDBox>
            <MDTypography display="block" variant={'button'} ml={1}>Ваш візит заброньовано</MDTypography>
          </Grid>
          <MDBox mt={2} mb={2}>
            <Grid item xs={12}>
              <Grid container justifyContent={'space-between'}>
                <MDTypography variant={'button'} mt={2}>Час бронювання</MDTypography>
                <MDTypography variant={'button'} mt={2} fontWeight="medium">{state.selectedDate} {state.selectedTime}</MDTypography>
              </Grid>
              <Grid container justifyContent={'space-between'}>
                <MDTypography variant={'button'} mt={1}>Телефон</MDTypography>
                <MDTypography variant={'button'} mt={1} fontWeight="medium">{state.business.phone_number}</MDTypography>
              </Grid>
              <Grid container justifyContent={'space-between'}>
                <MDTypography variant={'button'} mt={1}>Назва</MDTypography>
                <MDTypography variant={'button'} mt={1} fontWeight="medium">{state.business.display_name}</MDTypography>
              </Grid>
              {state.business.location && <Grid container justifyContent={'space-between'}>
                <MDTypography variant={'button'} mt={1}>Адреса</MDTypography>
                <MDTypography variant={'button'} mt={1} fontWeight="medium">{state.business.location.name}</MDTypography>
              </Grid>}
              <Grid container justifyContent={'space-between'}>
                <MDTypography variant={'button'} mt={1}>Ціна</MDTypography>
                <MDTypography variant={'button'} mt={1} fontWeight="medium">{state.selectedOffers.reduce((n: number, { duration }: { duration: number }) => n + duration, 0)} ₴</MDTypography>
              </Grid>
            </Grid>
          </MDBox>
        </Header>
      </MDBox>
    </PageLayout>
  );
}

export default BookingSuccess;
