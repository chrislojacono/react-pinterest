import axios from 'axios';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const patchFBBoardkeys = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards.json`).then((response) => {
    // console.warn(Object.keys(response.data));
    const keys = Object.keys(response.data);
    keys.forEach((key) => {
      axios.patch(`${baseUrl}/Boards/${key}.json`, { firebaseKey: key });
    });
  }).catch((error) => reject(error));
});

const patchFBPinkeys = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins.json`).then((response) => {
    // console.warn(Object.keys(response.data));
    const keys = Object.keys(response.data);
    keys.forEach((key) => {
      axios.patch(`${baseUrl}/Pins/${key}.json`, { firebaseKey: key });
    });
  }).catch((error) => reject(error));
});

export default { patchFBBoardkeys, patchFBPinkeys };
