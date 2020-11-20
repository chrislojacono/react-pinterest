import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createPin, updatePin, addPinsOfBoards } from '../../helpers/data/pinData';
import { getAllUserBoards } from '../../helpers/data/boardData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebase || '',
    description: this.props.pin?.description || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    private: this.props.pin?.private || false,
    website: this.props.pin?.website || '',
    userId: this.props.pin?.userId || '',
    boards: [],
  };

  boardRef = React.createRef();

  privateRef = React.createRef();

  componentDidMount() {
    const userId = getUser();
    this.setState({ userId });
    this.boardsResponse(userId).then((response) => {
      this.setState({
        userId,
        boards: response,
      });
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`,
      );

      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.btn.setAttribute('disabled', 'disabled');
    if (this.state.firebaseKey === '') {
      const newPin = {
        firebaseKey: this.state.firebaseKey,
        description: this.state.description,
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        private: this.privateRef.current.value,
        userId: this.state.userId,
      };
      createPin(newPin).then((response) => {
        const pinBoardObj = {
          boardId: this.boardRef.current.value,
          pinId: response.data.firebaseKey,
          userId: this.state.userId,
        };
        addPinsOfBoards(pinBoardObj);
      }).then(() => {
        this.props.onUpdate?.(this.props.boardId);
        this.setState({ success: true });
      });
    } else {
      const newPin = {
        firebaseKey: this.state.firebaseKey,
        description: this.state.description,
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        private: this.privateRef.current.value,
        userId: this.state.userId,
      };
      updatePin(newPin).then(() => {
        this.props.onUpdate?.(this.props.pin.firebaseKey);
        this.setState({ success: true });
      });
    }
  };

  boardsResponse = (userId) => (
    getAllUserBoards(userId).then((response) => response)
  );

  render() {
    const { success, boards } = this.state;

    return (
      <>
        {success && (
          <div className='alert alert-success' role='alert'>
            Your Pin was Updated/Created
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
        <label>Pin Name</label>
          <div>
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              placeholder='Pin Name'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label>Pin Description</label>
          <div>
            <input
              type='text'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
              placeholder='Pin Description'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label>Pin Website</label>
          <div>
            <input
              type='text'
              name='website'
              value={this.state.website}
              onChange={this.handleChange}
              placeholder='Pin Website'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <label>Public or Private</label>
          <select ref={this.privateRef} className='form-control form-control-lg m-2' required>
            <option value='true'>Private</option>
            <option value='false'>Public</option>
          </select>
          <label>Select A Board</label>
          <select ref={this.boardRef} label='Select A Board'className='form-control form-control-lg m-2'>
            {Object.keys(boards).length
            && boards.map((board) => (
              <option key={board.firebaseKey} value={board.firebaseKey}>{board.name}</option>
            ))}
          </select>
          <label>Add an Image</label>
          <div>
            <input
              type='url'
              name='imageUrl'
              value={this.state.imageUrl}
              onChange={this.handleChange}
              placeholder='Enter an Image URL or Upload a File'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <div>
            <input
              className='m-2'
              type='file'
              id='myFile'
              name='filename'
              accept='image/*'
              onChange={this.handleChange}
            />
          </div>
          <button
            ref={(btn) => {
              this.btn = btn;
            }}
            className='btn btn-primary m-2'
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}
