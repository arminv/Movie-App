import React, { useState } from 'react';
// import axios from 'axios';

import { Link as LinkRoute } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import './Register.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('SUCCESS!');
    // const newUser = {
    //   name,
    //   email,
    //   password,
    // };

    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   };

    //   const body = JSON.stringify(newUser);

    //   const res = await axios.post('/api/users', body, config);
    //   console.log(res.data);
    // } catch (err) {
    //   console.error(err.response.data);
    // }
  };

  return (
    <>
      <h1>Sign In :</h1>
      <form
        onSubmit={(e) => onSubmit(e)}
        className={classes.root}
        noValidate
        autoComplete='off'
      >
        <div className='container'>
          <TextField
            required
            label='Email Address'
            defaultValue=''
            fullWidth
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            required
            label='Password'
            type='password'
            fullWidth
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            // autoComplete='current-password'
          />
        </div>
        <Button
          type='submit'
          // onClick={onSubmit}
          variant='contained'
          color='primary'
        >
          Register
        </Button>
        <h4 className='subtitle'>
          Don't have an account?
          <LinkRoute to={`/register`} style={{ textDecoration: 'none' }}>
            <br />
            <br />
            Register
          </LinkRoute>
        </h4>
      </form>
    </>
  );
};

export default Login;
