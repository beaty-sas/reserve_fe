
import { Box } from "@mui/material";
import axiosInstance, { endpoints } from "src/utils/axios";

export const metadata = {
  title: 'Reserve Expert',
};

export default function Page() {

  return <Box mb={2}/>;
}


export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.business.available);
  
  return res.data;
}
