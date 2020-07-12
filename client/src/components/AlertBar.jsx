import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBar = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className={classes.root}>
        {/* Types: error / warning / info / success */}
        <Alert key={alert.id} severity={`${alert.alertType}`} variant='filled'>
          {alert.msg}
        </Alert>
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alertReducer,
  };
};

export default connect(mapStateToProps)(AlertBar);
