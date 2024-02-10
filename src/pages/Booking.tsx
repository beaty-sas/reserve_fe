import { Link, useParams } from "react-router-dom";
import MDButton from "../components/MDButton";
import Header from "../layouts/booking/Header";
import UserOffersTable from "../layouts/tables/userOffers";
import PageLayout from "../layouts/containers/page";
import { useQuery } from "@tanstack/react-query";
import { getBusiness } from "../services/bookingPage";


function Booking() {
  const params = useParams();
  const {
    data,
    isSuccess,
    isFetched,
  } = useQuery({
    queryFn: () => getBusiness(Number(params.id) as number),
    queryKey: ['business'],
  });

  if (!isSuccess || !isFetched) {
    return (<></>)
  }

  return (
    <PageLayout>
      <Header business={data}>
        <UserOffersTable />
        <MDButton
          component={Link}
          to={"/order/details"}
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

export default Booking;
