import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
  palette: {
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#ffebee',
    },
    text: {
      primary: "#ffebee"
    }
  },
});
export default function ButtonAppBar(props) {
  let navigate = useNavigate()
  const [show, setShow] = useState(false)

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
          <AppBar position="static" >

            <Toolbar >
              <IconButton
                onClick={() => { setShow(true) }}>
                <MenuIcon size="large"
                  edge="start"
                  color="secondary"
                  aria-label="menu"
                />
              </IconButton >

              <Typography align='center' variant="h6" component="div" color="textPrimary" sx={{ flexGrow: 1, mr: 5 }}>
                Techgig
              </Typography>
              {props.hide === true ? false : <LogoutSharpIcon onClick={logout} />}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Drawer
          anchor='left'
          open={show}
          PaperProps={{
            sx: {
              backgroundColor: "#cee9ce"
            }
          }} >

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { setShow(false) }}>
                <ListItemIcon sx={{ pl: 30 }} >
                  <ClearSharpIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {props.hide === true ?
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AddSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="+91 6291600398" />
                  </ListItemButton>
                </ListItem>
              </> :
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={logout}>
                    <ListItemIcon>
                      <LogoutSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>}
          </List>
        </Drawer>

      </Box>
    </>
  );
}
