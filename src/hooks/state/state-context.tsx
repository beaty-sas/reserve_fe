'use client';

import { createContext, useContext } from "react";
import { IAttachment } from "src/types/business";
import { IOffer } from "src/types/offer";


export type AttachemtnFile = {
  preview: string;
  attachment: IAttachment;
}

type SharedStateType = {
  selectedOffers: IOffer[];
  setSelectedOffers: (offers: IOffer[]) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setUserName: (name: string) => void;
  userName: string;
  setUserPhone: (phone: string) => void;
  userPhone: string;
  setComment: (comment: string) => void;
  comment: string;
  setAttachments: (attachments: AttachemtnFile[]) => void;
  attachments: AttachemtnFile[];
  reset: () => void;
};

export const SharedStateContext = createContext({} as SharedStateType);

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within an SharedProvider');
  }
  return context;
};
