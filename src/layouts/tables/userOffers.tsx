import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import userBookingTableData from "./data/userBookingTableData"
import DataTable from "./components";
import { BusinessOffer } from "../../types/business";

type Props = {
  setSelectedOffers(value: Array<BusinessOffer>): void
  selectedOffers: Array<BusinessOffer>
}

function UserOffersTable({ selectedOffers, setSelectedOffers }: Props) {
  const { columns, rows } = userBookingTableData(selectedOffers, setSelectedOffers);

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6} justifyContent={'center'}>
        <Grid item xs={12}>
          <DataTable
            table={{ columns, rows }}
            noEndBorder
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default UserOffersTable;
