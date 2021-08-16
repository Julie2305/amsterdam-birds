import { Bird } from '@/types'
import mapboxgl from 'mapbox-gl'

export const TypeOfBirds = {
  Gierzwaluw: {
    color: '#EF110A',
    birds: [] as Array<Bird>,
    markers: [] as Array<mapboxgl.Marker>,
  },
  Boerenzwaluw: {
    color: '#FE8E00',
    birds: [] as Array<Bird>,
    markers: [] as Array<mapboxgl.Marker>,
  },
  Huiszwaluw: {
    color: '#FEFA00',
    birds: [] as Array<Bird>,
    markers: [] as Array<mapboxgl.Marker>,
  },
  Huismus: {
    color: '#14C806',
    birds: [] as Array<Bird>,
    markers: [] as Array<mapboxgl.Marker>,
  },
  Spreeuw: {
    color: '#0641C8',
    birds: [] as Array<Bird>,
    markers: [] as Array<mapboxgl.Marker>,
  },
  Overig: {
    color: '#E300C1',
    birds: [] as Array<Bird>,
    markers: [] as Array<mapboxgl.Marker>,
  },
}
