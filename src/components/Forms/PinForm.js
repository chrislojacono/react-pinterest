import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createPin, updatePin } from '../../helpers/data/pinData';
import { getAllUserBoards } from '../../helpers/data/boardData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebase || '',
    description: this.props.pin?.description || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    private: this.props.pin?.private || false,
    userId: this.props.pin?.userId || '',
    boards: [],
  };

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
        private: this.state.private,
        userId: this.state.userId,
      };
      createPin(newPin).then(() => {
        this.props.onUpdate?.();
        this.setState({ success: true });
      });
    } else {
      const newPin = {
        firebaseKey: this.state.firebaseKey,
        description: this.state.description,
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        private: this.state.private,
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
          <select className='form-control form-control-lg m-2' required>
            <option value='true'>Private</option>
            <option value='false'>Public</option>
          </select>
          <label>Select A Board</label>
          <select
            label='Select A Board'
            className='form-control form-control-lg m-2'
          >
            {Object.keys(boards).length
            && boards.map((board) => (
              <option value={board.firebaseKey}>{board.name}</option>
            ))}
          </select>
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
