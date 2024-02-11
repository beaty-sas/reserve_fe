import { useNavigate, useParams } from "react-router-dom";
import MDButton from "../components/MDButton";
import Header from "../layouts/booking/Header";
import UserOffersTable from "../layouts/tables/userOffers";
import PageLayout from "../layouts/containers/page";
import { useQuery } from "@tanstack/react-query";
import { getBusiness } from "../services/bookingPage";
import { useState } from "react";
import { BusinessOffer } from "../types/business";


function Booking() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data,
    isSuccess,
    isFetched,
  } = useQuery({
    queryFn: () => getBusiness(Number(params.id) as number),
    queryKey: ['business'],
  });
  const [selectedOffers, setSelectedOffers] = useState<Array<BusinessOffer>>([])

  if (!isSuccess || !isFetched) {
    return (<></>)
  }

  return (
    <PageLayout>
      <Header business={data}>
        <UserOffersTable
          setSelectedOffers={setSelectedOffers}
          selectedOffers={selectedOffers}
        />
        <MDButton
          onClick={() => navigate(`/booking/${params.id}/confirm`, { state: { selectedOffers } })}
          state={selectedOffers}
          rel="noreferrer"
          variant="outlined"
          size="large"
          color={"info"}
        >
          {"Далі"}
        </MDButton>
      </Header>
    </PageLayout>
  );
}

export default Booking;
