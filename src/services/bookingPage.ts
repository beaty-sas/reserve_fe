import axios from 'axios';
import { AvailableHoursRequest, AvailableTime, Business, BusinessOffer, CreateOrderRequest } from '../types/business';

const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:4000"


export const getBusiness = async (id: number): Promise<Business> => {
  const { status, data } = await axios.get(`${BASE_URL}/businesses/${id}`);

  if (status !== 200) throw new Error('Faild');
  return data;
};

export const getBusinessOffers = async (id: number): Promise<Array<BusinessOffer>> => {
  const { status, data } = await axios.get(`${BASE_URL}/businesses/${id}/offers`);

  if (status !== 200) throw new Error('Faild');
  return data;
};

export const getAvailableHours = async (id: number, request_data: AvailableHoursRequest): Promise<Array<AvailableTime>> => {
  const { status, data } = await axios.get(
    `${BASE_URL}/working-hours/${id}/available`,
    { params: request_data },
  );

  if (status !== 200) throw new Error('Faild');
  return data;
};

export const postNewOrder = async (request_data: CreateOrderRequest) => {
  const { status, data } = await axios.post(`${BASE_URL}/booking`, request_data);

  if (status !== 201) throw new Error('Faild');
  return data;
};
