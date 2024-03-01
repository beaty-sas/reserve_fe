export type IAttachment = {
  id: number;
  original: string;
  thumbnail: string;
};

export type ILocation = {
  name: string;
  geom: string;
};

export type IBusiness = {
  id: number;
  display_name: string;
  phone_number: string;
  location?: ILocation | null;
  logo?: IAttachment | null;
};
