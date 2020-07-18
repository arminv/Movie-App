import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserMovies } from '../redux/actions';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Cards from '../components/Cards';

const Cart = ({ userMovies, getUserMovies, user }) => {
  useEffect(() => {
    if (user) {
      getUserMovies(user._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userMovies]);

  const userMovieCards = Object.keys(userMovies).map((item, index) => {
    return (
      <Grid className='cards' key={index} item style={{ display: 'flex' }}>
        <Cards id={userMovies[item]['movies']} key={index} cart={true} />
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
  userMovies: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userMovies: state.moviesReducer.userMovies,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { getUserMovies })(Cart);
