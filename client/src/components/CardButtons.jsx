import React from 'react';
import { connect } from 'react-redux';
import { addUserMovie } from '../redux/actions';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

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
          cart ? history.push(`/cart`) : history.push(`/home`);
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
          cart ? history.push(`/cart`) : history.push(`/home`);
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

// export default CardButtons;
