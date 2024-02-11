import { useMutation } from "@tanstack/react-query";
import { UserObject } from "../types/business";
import { postNewOrder } from "./bookingPage";

export const useCreateOrder = (
    start_time: string,
    business_id: number,
    offers: Array<number>,
    user: UserObject,
) => {
    return useMutation({
        mutationFn: () => postNewOrder({ start_time, business_id, offers, user }),
    });
};
