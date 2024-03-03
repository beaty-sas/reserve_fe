import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import { IOffer } from 'src/types/offer';

import { endpoints, fetcher } from 'src/utils/axios';


// ----------------------------------------------------------------------

export function useGetOffers(slug: string): {
  offers: IOffer[];
  offersLoading: boolean;
  offersError: any;
  offersValidating: boolean;
  offersEmpty: boolean;
} {
  const URL = endpoints.business.list + `${slug}/offers`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      offers: (data as IOffer[]) || [],
      offersLoading: isLoading,
      offersError: error,
      offersValidating: isValidating,
      offersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
