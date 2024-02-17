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

  const Offer = ({ name, duration }: any) => (
    <MDBox display="flex" alignItems="start" lineHeight={1} flexDirection={'column'}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
      <MDTypography variant="button" color="text" fontWeight="regular" ml={1} mt={1} lineHeight={1}>
        {duration}
      </MDTypography>
    </MDBox>
  );

  function secondsToDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    // Format the duration
    let duration = '';
    if (hours > 0) {
      duration += hours + ' год';
    }
    if (minutes > 0 || hours === 0) {
      duration += minutes + ' хвилин';
    }
    return duration;
  }

  return {
    columns: [
      { Header: "Назва", accessor: "name", align: "left", width: "80%" },
      { Header: "Вартість", accessor: "amount", align: "right", width: "10%" },
      { Header: "Вибрати", accessor: "action", align: "left", width: "10%"},
    ],

    rows: data?.map((offer: BusinessOffer) => ({
      name: <Offer name={offer.name} duration={secondsToDuration(offer.duration)} />,
      amount: (
        <MDTypography variant="button">
          {Number(offer.price).toFixed(0)} ₴
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
