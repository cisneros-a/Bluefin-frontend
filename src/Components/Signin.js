import React from "react";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TestNavbar from './TestNavbar'
import {getProfileFetch, userSigninFetch} from '../actions';
import LandlordDashboard from './LandlordDashboard'
import TenantDashboard from './TenantDashboard'
import LandlordNavbar from './LandlordNavbar'
import history from '../history'




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Job Huntr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {

  useEffect(() => {
    dispatch(getProfileFetch())

}, [])

  const decideUserPath = () => {
    if (isLogged){
      if (userType === 'tenant'){
        history.push('/tenant-home')
      } else {
        history.push('/landlord-home')
      }
    } 
  } 

  // const user_info = useSelector(state => state.user)
//   const dispatch = useDispatch() 
  const isLogged = useSelector(state => state.isLogged)
  const classes = useStyles();
  const dispatch = useDispatch() 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("")
  // const API = "http://localhost:3000/login";

  let handleEmailChange = event => {
    setEmail(event.target.value);
  };
  let handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  let handleTypeChange = event => {
    setUserType(event.target.value);
  };


  let handleSubmit = event => {
    event.preventDefault();

    let user = {
      email: email,
      password: password,
    };
    
    set_user(user)
   

  };

  const set_user = (user) => {
    dispatch(userSigninFetch(user, userType))
  }

  return (
   

    <Container component="main" maxWidth="xs">
       {decideUserPath()}  
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={event => handleSubmit(event)}
          className={classes.form}
          noValidate
        >
          <TextField
            onChange={event => {
              handleEmailChange(event);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={event => {
              handlePasswordChange(event);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormLabel component="legend">User Type:</FormLabel>
          <RadioGroup aria-label="userType" name="userType" value={userType} onChange={(event) => handleTypeChange(event)} row>
          <FormControlLabel  value="landlord" control={<Radio />} label="Landlord" />
          <FormControlLabel  value="tenant" control={<Radio />} label="Tenant" />
         
        </RadioGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


