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
  name: string
  price: number
  duration: number
}