import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
import { IWorkingHour } from 'src/types/working-hour';


// ----------------------------------------------------------------------

export function useGetWorkingHours(businessId: number, date: string, duration: number): {
  workingHours: IWorkingHour[];
  workingHoursLoading: boolean;
  workingHoursError: any;
  workingHoursValidating: boolean;
  workingHoursEmpty: boolean;
} {
  const URL = endpoints.workingHours.list + `${businessId}/available?duration=${duration}&date=${date}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      workingHours: (data as IWorkingHour[]),
      workingHoursLoading: isLoading,
      workingHoursError: error,
      workingHoursValidating: isValidating,
      workingHoursEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
