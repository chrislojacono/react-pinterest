import axios from 'axios';
import ApiKeys from '../apiKeys';

const baseUrl = ApiKeys.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/Boards.json`)
    .then((response) => {
      const boards = response.data;
      const boardsArray = [];
      if (boards) {
        Object.keys(boards).forEach((boardId) => {
          boardsArray.push(boards[boardId]);
        });
      }
      resolve(boardsArray);
    })
    .catch((error) => reject(error));
});

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&indexOn="${boardId}"`).then((response) => {
    const pinData = response.data;
    const pinArray = [];
    if (pinData) {
      Object.keys(pinData).forEach((pin) => {
        pinArray.push(pinData[pin]);
      });
    }
    console.warn(pinArray);
    resolve(pinArray);
  }).catch((error) => reject(error));
});

export default { getBoardPins, getBoards };
