import axios from '../node_modules/axios/index';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

//Google APIにて
const GOOGLE_API_KEY = 'AIzaSyDdnlzBuE2g6hzbAKke9yg7PlEH_D8i6e4';

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('座標を取得できませんでした');
      }
      console.log(response);
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
