import axios from 'axios';
import { Business, BusinessOffer } from '../types/business';

const BASE_URL = "http://127.0.0.1:4000"


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
