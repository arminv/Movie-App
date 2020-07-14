import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserMovies } from '../redux/actions';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Cards from '../components/Cards';

const Cart = ({ user, getUserMovies, userMovies }) => {
  useEffect(() => {
    getUserMovies(user._id);
  }, [getUserMovies, user._id]);

  const userMovieCards = Object.keys(userMovies).map((item, index) => {
    return (
      <Grid className='cards' key={index} item style={{ display: 'flex' }}>
        <Cards id={userMovies[item]['movies']} key={index} />
      </Grid>
    );
  });
  return (
    <div>
      <h1>MY MOVIES</h1>
      <Container>
        <Grid container alignItems='stretch' direction='row' justify='center'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justify='center' spacing={3}>
              {userMovieCards}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Cart.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  userMovies: state.moviesReducer.userMovies,
});

export default connect(mapStateToProps, { getUserMovies })(Cart);
