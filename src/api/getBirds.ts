import { BirdResponse } from '@/types'

const getBirds = async (): Promise<BirdResponse> => {
  return fetch('https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VOGELS&THEMA=vogels', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then((json: BirdResponse) => {
      return json
    })
}

export default getBirds
