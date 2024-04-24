'use client';

import { useCallback, useMemo } from "react";
import { IOffer } from "src/types/offer";
import { useLocalStorage } from "../use-local-storage";
import { SharedStateContext } from "./state-context";

const STORAGE_KEY = 'sharedState';

const initialState = {
  selectedOffers: [],
};

type Props = {
  children: React.ReactNode;
};

export function SharedStateProvider({ children }: Props) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, initialState);

  const setSelectedOffers = useCallback((offers: IOffer[]) => {
    update('selectedOffers', offers);
  }, [update]);

  const setSelectedTime = useCallback((offers: IOffer[]) => {
    update('selectedTime', offers);
  }, [update]);

  const setSelectedDate = useCallback((offers: IOffer[]) => {
    update('selectedDate', offers);
  }, [update]);


  const memoizedValue = useMemo(
    () => ({
      ...state,
      reset,
      update,
      setSelectedOffers,
      setSelectedTime,
      setSelectedDate,
    }),
    [
      reset,
      update,
      setSelectedOffers,
      setSelectedTime,
      setSelectedDate,
      state,
    ]
  );

  return <SharedStateContext.Provider value={ memoizedValue }> { children }</SharedStateContext.Provider>;
}