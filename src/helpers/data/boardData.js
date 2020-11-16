import axios from 'axios';
import ApiKeys from '../apiKeys';
import pinData from './pinData';

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

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    const pinResponse = response.data;
    const pinArray = [];
    if (pinResponse) {
      Object.keys(pinResponse).forEach((pin) => {
        pinArray.push(pinResponse[pin]);
      });
    }
    console.warn(pinArray);
    resolve(pinArray);
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const deleteBoard = (boardUid) => {
  getBoardPins(boardUid)
    .then((response) => {
      console.warn(response);
      response.forEach((item) => {
        pinData.deletePin(item.uid);
      });
    })
    .then(() => {
      getSingleBoard(boardUid).then((response) => {
        console.warn(boardUid);
        axios.delete(`${baseUrl}/Boards/${response.firebaseKey}.json`);
      });
    });
};

const updateBoard = (uid, dataObject) => axios.patch(`${baseUrl}/Boards/${uid}.json`, dataObject);

export default {
  getBoardPins,
  getBoards,
  getSingleBoard,
  deleteBoard,
  updateBoard,
  getAllUserBoards,
};
