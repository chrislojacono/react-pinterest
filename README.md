# Pinterest 3.0 w/React
This was a project we did to learn CRUD with react. It was meant to be the same idea as the real Pinterest. Where a user can log in and add Boards the add Pins to the Boards with pictures and links to websites associated with them.!

## The Motivation
The main motivation was to learn CRUD functionality while working in react. This was also good practive of complex data structures and intermediary tables within firebase. It was a challenge to learn how to keep track of the data within the intermediary data table while editing and deleting pins/boards.

## Build Status/Deployed Link
[![Netlify Status](https://api.netlify.com/api/v1/badges/998453e7-ba95-4682-a3b6-c113a6022d1d/deploy-status)](https://app.netlify.com/sites/pinterest3/deploys)
###### [Deployed Link](https://pinterest3.netlify.app/pins)

## Screenshots
![screencapture-pinterest3-netlify-app-pins-2020-11-21-13_23_01](https://user-images.githubusercontent.com/66916708/99885741-b8603d80-2bfc-11eb-94a4-8acb5f4e0433.png)

## Code Style
Written with React.strictMode and eslintrc

## Tech/Framework
React.js

## Features
Users can authenticate(login/logout)
Users Can Create, Edit, Delete and Read Boards
Users Can Create, Edit, Delete and Read Pins
Users can attach pins to specific boards and remove them
Users can search through the pins or boards

## Code Example
```
  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.getBoardInfo(boardId);
    this.getPins(boardId).then((resp) => this.setState({
      pins: resp,
    }));
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      const pinArray = [];
      response.forEach((item) => {
        pinArray.push(getSinglePin(item.pinId));
      });
      return Promise.all([...pinArray]);
    }))
    ```
    
    
