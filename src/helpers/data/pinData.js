import axios from 'axios';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const getAllPins = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Pins.json`)
    .then((response) => {
      const Pins = response.data;
      const PinsArray = [];
      if (Pins) {
        Object.keys(Pins).forEach((boardId) => {
          PinsArray.push(Pins[boardId]);
        });
      }
      resolve(PinsArray);
    })
    .catch((error) => reject(error));
});

const getSinglePin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const deletePin = (pinUid) => axios.delete(`${baseUrl}/Pins/${pinUid}.json`);

const createPin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Pinss.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/Pinss/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updatePin = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/Pinss/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

export {
  getSinglePin,
  getAllPins,
  deletePin,
  updatePin,
  createPin,
};
