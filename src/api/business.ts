import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
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
