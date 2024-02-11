import Checkbox from "@mui/material/Checkbox";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import { useQuery } from "@tanstack/react-query";
import { getBusinessOffers } from "../../../services/bookingPage";
import { useParams } from "react-router-dom";
import { BusinessOffer } from "../../../types/business";


export default function data(selectedOffers: Array<BusinessOffer>, setSelectedOffers: any) {
  const params = useParams();
  const { data } = useQuery({
    queryFn: () => getBusinessOffers(Number(params.id) as number),
    queryKey: ['offers'],
  });

  const Offer = ({ name }: any) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  function secondsToDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    // Format the duration
    let duration = '';
    if (hours > 0) {
      duration += hours + ' год ';
    }
    if (minutes > 0 || hours === 0) {
      duration += minutes + ' мін';
    }
    return duration;
  }

  return {
    columns: [
      { Header: "Назва", accessor: "name", width: "70%", align: "left" },
      { Header: "Тривалість", accessor: "duration", align: "center" },
      { Header: "Вартість", accessor: "amount", align: "left" },
      { Header: "Вибрати", accessor: "action", align: "center" },
    ],

    rows: data?.map((offer: BusinessOffer) => ({
      name: <Offer name={offer.name} />,
      amount: (
        <MDTypography variant="button" color="text" fontWeight="medium">
          {offer.price} грн
        </MDTypography>
      ),
      duration: (
        <MDTypography variant="button" color="text" fontWeight="medium">
          {secondsToDuration(offer.duration)}
        </MDTypography>
      ),
      action: (
        <Checkbox
          checked={selectedOffers.includes(offer)}
          onChange={(_, checked) => {
            if (checked) {
              setSelectedOffers([...selectedOffers, offer])
            } else {
              setSelectedOffers(selectedOffers.filter((selectedOffer) => selectedOffer.id !== offer.id))
            }
          }}
        />),
    })) ?? []
  };
}
