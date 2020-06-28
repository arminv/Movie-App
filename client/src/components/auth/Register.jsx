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

const Register = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Pasword do not match!');
    } else {
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
    }
  };

  return (
    <>
      <h1>Sign Up :</h1>
      <form
        onSubmit={(e) => onSubmit(e)}
        className={classes.root}
        noValidate
        autoComplete='off'
      >
        <div className='container'>
          <TextField
            required
            label='Name'
            defaultValue=''
            fullWidth
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
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
          <TextField
            required
            label='Confirm Password'
            type='password'
            fullWidth
            name='password2'
            value={password2}
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
          Already have an account?
          <LinkRoute to={`/login`} style={{ textDecoration: 'none' }}>
            <br />
            <br />
            Sign In
          </LinkRoute>
        </h4>
      </form>
    </>
  );
};

export default Register;
