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
