import { ICreateBooking } from 'src/types/order';
import axiosInstance, { endpoints } from 'src/utils/axios';


// ----------------------------------------------------------------------

export async function createNewBooking(data: ICreateBooking) {
  const URL = endpoints.booking.create;

  await axiosInstance.post(URL, data);
}

// ----------------------------------------------------------------------
