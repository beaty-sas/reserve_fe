export type IUser = {
    display_name: string;
    phone_number: string;
}


export type ICreateBooking = {
    start_time: string;
    business_id: number;
    offers: number[];
    user: IUser;
    comment?: string;
    attachments?: Array<number>;
}