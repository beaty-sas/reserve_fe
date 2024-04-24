'use client';

import { createContext, useContext } from "react";
import { IOffer } from "src/types/offer";

type SharedStateType = {
  selectedOffers: IOffer[];
  setSelectedOffers: (offers: IOffer[]) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

export const SharedStateContext = createContext({} as SharedStateType);

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within an SharedProvider');
  }
  return context;
};
