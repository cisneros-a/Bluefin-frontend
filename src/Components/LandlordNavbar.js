import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';
import { logoutUser, loginUser } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default function MenuAppBar() {
  const dispatch = useDispatch()
  const name = useSelector(state => state.user.name)
  const id = useSelector(state => state.user.user_id)
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleChange = event => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = event => {
//     setAnchorEl(event.currentTarget);
//   };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = (event) => {
      event.preventDefault()
      localStorage.removeItem("token")
      localStorage.removeItem("userType")

      dispatch(logoutUser())

  }

  const handleSwitchClick = (event) => {
    let user = {
      name: name,
      id: id,
    };
    console.log({user})
    localStorage.setItem("userType", "tenant")
    dispatch(loginUser(user , "tenant"))

}

  

  return (
    <div className={classes.root}>
     
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
            {/* Bluefin - Landlord */}
          </Typography>
          <Button color="inherit">Lease applications</Button>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Bluefin - Landlord
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {/* Bluefin - Landlord */}
          </Typography>
          <AccountCircle />
          {auth && (
            <div>
             <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon/>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
        onClick={(event) => handleSwitchClick(event)}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Switch Dashboard" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledMenuItem>

        <StyledMenuItem
        onClick={(event) => handleLogoutClick(event)}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}