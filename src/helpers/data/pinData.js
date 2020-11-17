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

// const getAllPinsPatch = () => new Promise((resolve, reject) => {
//   axios
//     .get(`${baseUrl}/Pins.json`)
//     .then((response) => {
//       const Pins = response.data;
//       const PinsArray = [];
//       if (Pins) {
//         Object.keys(Pins).forEach((boardId) => {
//           PinsArray.push(Pins[boardId]);
//         });
//       }
//       PinsArray.forEach((pin) => {

//       })
//     })
//     .catch((error) => reject(error));
// });

const getSinglePin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const deletePin = (pinUid) => axios.delete(`${baseUrl}/Pins/${pinUid}.json`);

const updatePin = (uid, dataObject) => axios.patch(`${baseUrl}/Pins/${uid}.json`, dataObject);

export default {
  getSinglePin,
  getAllPins,
  deletePin,
  updatePin,
};
