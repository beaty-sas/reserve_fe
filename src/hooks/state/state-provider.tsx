'use client';

import { useCallback, useEffect, useMemo } from "react";
import { IOffer } from "src/types/offer";
import { useLocalStorage } from "../use-local-storage";
import { AttachemtnFile, SharedStateContext } from "./state-context";

const STORAGE_KEY = 'sharedState';

const initialState = {
  selectedOffers: [],
  selectedTime: '',
  selectedDate: '',
  userName: '',
  userPhone: '',
  comment: '',
  attachments: [],
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

  const setUserName = useCallback((name: string) => {
    update('userName', name);
  }, [update]);

  const setUserPhone = useCallback((phone: string) => {
    update('userPhone', phone);
  }, [update]);

  const setAttachments = useCallback((attachments: AttachemtnFile[]) => {
    update('attachments', attachments);
  }, [update]);

  const setComment = useCallback((comment: string) => {
    update('comment', comment);
  }, [update]);

  const setLastUpdated = useCallback(() => {
    update('lastUpdated', new Date().toISOString());
  }, [update]);

  useEffect(() => {
    setLastUpdated();
  }, [setLastUpdated, setAttachments, setComment, setSelectedDate, setSelectedOffers, setSelectedTime, setUserName, setUserPhone]);

  useEffect(() => {
    if (new Date().getTime() - new Date(state.lastUpdated).getTime() > 1000 * 60 * 60) {
      reset();
    }
  }, [state.lastUpdated, reset]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      reset,
      update,
      setSelectedOffers,
      setSelectedTime,
      setSelectedDate,
      setUserName,
      setUserPhone,
      setAttachments,
      setComment,
    }),
    [
      reset,
      update,
      setSelectedOffers,
      setSelectedTime,
      setSelectedDate,
      setUserName,
      setUserPhone,
      setAttachments,
      setComment,
      state,
    ]
  );

  return <SharedStateContext.Provider value={memoizedValue}> {children}</SharedStateContext.Provider>;
}