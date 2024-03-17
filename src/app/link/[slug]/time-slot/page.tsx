
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

  return <TimeSlot slug={slug} />;
}


export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.business.available);
  
  return res.data;
}
