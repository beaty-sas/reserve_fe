export type Location = {
  name: string
  geom: string
}

export type Attachment = {
  original: string
  thumbnail: string
}

export type Business = {
  display_name: string
  phone_number: number
  location?: Location
  logo?: Attachment
}

export type BusinessOffer = {
  id: number
  name: string
  price: number
  duration: number
}

export type AvailableHoursRequest = {
  date: string
  duration: number
}

export type AvailableTime = {
  time: string
}

export type UserObject = {
  display_name: string
  phone_number: string
}

export type CreateOrderRequest = {
  start_time: string
  business_id: number
  offers: Array<number>
  user: UserObject
}