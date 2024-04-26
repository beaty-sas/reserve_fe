
import UserInfoView from "src/sections/booking/user-info";
import axiosInstance, { endpoints } from "src/utils/axios";

export const metadata = {
  title: 'Reserve Expert',
};


export default function Page() {

  return (
    <UserInfoView />
  );
}


export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.business.available);

  return res.data;
}
