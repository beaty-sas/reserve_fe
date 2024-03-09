import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';
import { IBusiness } from '../types/business';


// ----------------------------------------------------------------------

export function useGetBusiness(slug: string): {
  business: IBusiness;
  businessLoading: boolean;
  businessError: any;
  businessValidating: boolean;
  businessEmpty: boolean;
} {
  const URL = endpoints.business.list + slug;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      business: (data as IBusiness),
      businessLoading: isLoading,
      businessError: error,
      businessValidating: isValidating,
      businessEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function makeNewAttachment(file: any) {
  const URL = endpoints.attachements;

  const response = await axiosInstance.post(URL, { attachment: file }, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response.data;
}

// ----------------------------------------------------------------------
