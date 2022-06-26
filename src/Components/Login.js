import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonAppBar from './Navbar'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loggedin } from '../state/userchecker';

function Copyright(props) {
  return ( 
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
    const dispatch = useDispatch()
  
const {detector} = useSelector(state=>state.verifier)
console.log(detector)


 


  let navigate = useNavigate()


  let[password,setPassword] = useState('')
  let[id,setId] = useState('')
  let vlaue1 = (event) =>{
      setId(event.target.value);
  }

  let value2 = (event) =>{
      setPassword(event.target.value);
  }
  let[auth,setAuth] = useState('')

  const trigger =(event)=>{
    event.preventDefault()
    if(id==='foo'&&password==='bar'){
        localStorage.setItem('userState',true)
        dispatch(loggedin())
        navigate('/home')
    }
        else{
        setAuth('error')
    }
  }
  

  return (
      <>
      <ButtonAppBar hide={true}></ButtonAppBar>
    <ThemeProvider theme={theme}>
      <Grid container component="main"  sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square sx={{backgroundImage:"linear-gradient(#E1DADA,#BDCAD9)"}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
           
            {auth==='error'?( <Typography component="h6" color={'red'} variant="h5">
            Enter valid credentials.
            </Typography>):null}
            <Box   sx={{ mt: 1 }}>
                <form onSubmit={trigger}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="input"
                label="Login ID"
                name="email"
                autoComplete="input"
                autoFocus
                onChange={vlaue1}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={value2}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}
