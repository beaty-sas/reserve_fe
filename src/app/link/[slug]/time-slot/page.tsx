
import { Card, Grid } from "@mui/material";
import TimeSlot from "src/sections/booking/time-slot";
import axiosInstance, { endpoints } from "src/utils/axios";

export const metadata = {
  title: 'Reserve Expert',
};

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  const { slug } = params;

  return (
    <Grid xs={12} md={6}>
      <Card sx={{ ml: { md: 2 } }}>
        <TimeSlot slug={slug} />
      </Card>
    </Grid>
  );
}


export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.business.available);

  return res.data;
}
