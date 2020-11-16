import axios from 'axios';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const patchPinsFromFirebase = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins.json`).then((response) => {
    const keys = Object.keys(response.data);
    keys.forEach((item) => {
      axios.patch(`${baseUrl}/Pins/${item}.json`, { firebaseKey: item });
    });
  }).catch((error) => reject(error));
});

const patchBoardsFromFirebase = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards.json`).then((response) => {
    const keys = Object.keys(response.data);
    keys.forEach((item) => {
      axios.patch(`${baseUrl}/Boards/${item}.json`, { firebaseKey: item });
    });
  }).catch((error) => reject(error));
});

export default { patchPinsFromFirebase, patchBoardsFromFirebase };
