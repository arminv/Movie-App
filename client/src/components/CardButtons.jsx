import React from 'react';
import { connect } from 'react-redux';
import { addUserMovie } from '../redux/actions';

import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

const CardButtons = ({
  addBtn,
  removeBtn,
  auth,
  findAndRemoveMovie,
  addUserMovie,
  id,
  cart,
}) => {
  if (addBtn && !auth) {
    return (
      <Tooltip title='Please sign in to add movie to your list'>
        <Button
          size='small'
          color='primary'
          style={{ color: 'white', alignItems: 'flex-end' }}
          onClick={() => {
            return null;
          }}
        >
          <AddCircleOutlineIcon>Add Movie</AddCircleOutlineIcon>
        </Button>
      </Tooltip>
    );
  }

  if (addBtn && auth) {
    return (
      <Button
        size='small'
        color='primary'
        style={{ color: 'white', alignItems: 'flex-end' }}
        onClick={() => {
          addUserMovie(id);
        }}
      >
        <AddCircleOutlineIcon>Add Movie</AddCircleOutlineIcon>
      </Button>
    );
  }

  if (removeBtn) {
    return (
      <Button
        size='small'
        color='primary'
        style={{ color: 'white', alignItems: 'flex-end' }}
        onClick={() => {
          findAndRemoveMovie(id);
        }}
      >
        <RemoveCircleOutlineIcon>Remove Movie</RemoveCircleOutlineIcon>
      </Button>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { addUserMovie })(CardButtons);
