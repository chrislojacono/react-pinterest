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
  axios.post(`${baseUrl}/Pins.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/Pins/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updatePin = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/Pins/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const getUserPins = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins.json?orderBy="userId"&equalTo="${userId}"`).then((response) => {
    const pinResponse = response.data;
    const pinArray = [];
    if (pinResponse) {
      Object.keys(pinResponse).forEach((pin) => {
        pinArray.push(pinResponse[pin]);
      });
    }
    resolve(pinArray);
  }).catch((error) => reject(error));
});

const addPinsOfBoards = (dataObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins-boards.json`, dataObject).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update);
  }).catch((error) => reject(error));
});

export {
  getSinglePin,
  getAllPins,
  deletePin,
  updatePin,
  createPin,
  getUserPins,
  addPinsOfBoards,
};
