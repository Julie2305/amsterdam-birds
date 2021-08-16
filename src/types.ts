import { LngLatLike } from 'mapbox-gl'

export enum BirdEnum {
  GIERZWALUW = 'Gierzwaluw',
  BOERENZWALUM = 'Boerenzwaluw',
  HUISZWALUM = 'Huiszwaluw',
  HUISMUS = 'Huismus',
  SPREEUW = 'Spreeuw',
  OTHER = 'Overig'
}

export type Bird = {
  geometry: {
    coordinates: LngLatLike,
  },
  id: number,
  properties: {
    Vogel: BirdEnum,
  },
}

export type BirdResponse = {
  features: Array<Bird>,
}

export type TypeOfBird = {
  type: BirdEnum,
  color: String,
  icon: String,
  birds: Array<Bird>,
}
