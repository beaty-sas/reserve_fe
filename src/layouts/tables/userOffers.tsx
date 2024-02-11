import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
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
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Послуги
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default UserOffersTable;
