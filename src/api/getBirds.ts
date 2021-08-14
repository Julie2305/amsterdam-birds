import { Bird } from '@/types'

type Response = {
  features: Array<Bird>,
}

const getBirds = async (): Promise<Array<Bird>> => {
  return fetch('https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VOGELS&THEMA=vogels', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(response => response.json())
    .then((json: Response) => {
      console.log(json)
      return json.features
    })
}

export default getBirds
