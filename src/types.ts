import { LngLatLike } from 'mapbox-gl'

export enum BirdNames {
  GIERZWALUW = 'Gierzwaluw',
  BOERENZWALUM = 'Boerenzwaluw',
  HUISZWALUM = 'Huiszwaluw',
  HUISMUS = 'Huismus',
  SPREEUW = 'Spreeuw',
}

export type Bird = {
  geometry: {
    coordinates: LngLatLike[],
  },
  id: number,
  properties: {
    Vogel: BirdNames,
  },
}
