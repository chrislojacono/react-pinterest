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

export default getBoards;
