
import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Input } from '@material-ui/core';
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {userSignupFetch} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { DirectUpload } from "activestorage";
import Dropzone from 'react-dropzone'




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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Signup(props) {
  const userId = useSelector(state => state.user.user_id)
  const dispatch = useDispatch() 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState('')
  const classes = useStyles();
  const [images, setImages] = useState('')


  let handleSubmit = async event => {
    //   let input = "5920 Zachary Scott St Austin"
      event.preventDefault();
    //   fetch(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=OHYIZygaUlcGO559jEmBfMg_2UaFX5n3qMoYn7h2TKo&searchtext=${input}`)
    //   .then(res=>res.json())
    //   .then(data => console.log(data.Response.View[0].Result[0].Location.DisplayPosition.Latitude, data.Response.View[0].Result[0].Location.DisplayPosition.Longitude ))
    // // console.log(images)
    let property = {user_id: 2, address: '1744 Dorch Dr, Pflugerville, TX 78660', rent: '170', bedrooms: '4', bathrooms: '3', sqft: '2699', availability: 1, available_date: '01/28/20', description: "Large home that is well kept! A MUST SEE!", latitude: 30.350558, longitude: -97.887929, uploads: images[0]};
    const res = await fetch("http://localhost:3000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ property })
      })
  
      const data = await res.json()
      if (data.message) {
        console.log('Maybe this failed')
      } else {
        uploadFile(images, data)
        // console.log(data)
      }
  };

  const uploadFile = (files ,propertyId) => {
    console.log(propertyId)
      
      files.forEach(file => {
        //   let property = {
        //       uploads: file
        //   }
      const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        console.log(file)
      upload.create((error, blob) => {
           
        //   let property = { uploads : blob.signed_id
        //   }
          console.log('blob', blob)
          if (error) {
              console.log(error)
          } else {
              console.log('no error')
              fetch(`http://localhost:3000/properties/${propertyId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({ uploads: blob.signed_id })
              })
              .then(res => res.json())
              .then(result => console.log(result))
          }
          console.log('pls workk')
      })
      })
  }

//   let handleAccept = (applicationId, tenantId, propertyId) => {
//     let API = `http://localhost:3000/applications/${applicationId}`;

//     fetch(API, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json"
//         },
//         body: JSON.stringify({ status: "Accepted" })
//       }).then(postLease(tenantId, propertyId)) 
//   }

 

  let handleNameChange = event => {
      console.log(files)
    setName(event.target.value);
  };
  let handleEmailChange = event => {
    setEmail(event.target.value);
  };
  let handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  let handleFileChange = (event) => {
      if (event.target.name === 'imgCollection') {
        let imgArray = []
        for (let i = 0; i < event.target.files.length ; i++){
            imgArray.push(event.target.files[i])
        }
    setFiles(imgArray)
      }
  }

  let handleDrop = acceptedFiles => {
      setImages(acceptedFiles)
  }

//   const getRequest = () => {
//     fetch('https://storage.googleapis.com/storage/v1/b/bluefin-app')
//     .then(res=> res.json())
//     .then(data => console.log(data))
//   }

//   getRequest()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Upload A Home
        </Typography>
        <form
          onSubmit={event => handleSubmit(event)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={event => {
                  handleNameChange(event);
                }}
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={event => {
                  handleEmailChange(event);
                }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={event => {
                  handlePasswordChange(event);
                }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <input type="file" name="imgCollection" onChange={(event) => handleFileChange(event)} multiple /> */}


<Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)} accept="image/png, image/gif,image/jpg,image/jpeg">
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}