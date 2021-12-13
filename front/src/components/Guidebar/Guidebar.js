import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";

const pages = ['home', 'alltask', 'mytask','dotask'];

const Guidebar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/"  style={{ textDecoration: 'none' }}>
              <Button
                key={pages[0]}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                 HOME
              </Button>
            </Link>

            <Link to="/videocap"  style={{ textDecoration: 'none' }}>
              <Button
                key={pages[1]}
                sx={{ my: 2, color: 'white', display: 'block' }} 
              >
                 ALL TASKS
              </Button>
            </Link>

            <Link to="/mytask"  style={{ textDecoration: 'none' }}>
              <Button
                key={pages[2]}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                 MY TASKS
              </Button>
            </Link>

            <Link to="/mark"  style={{ textDecoration: 'none' }}>
              <Button
                key={pages[3]}
                sx={{ my: 2, color: 'white', display: 'block' }}  
              >
                 DO TASK
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link to="/about"  style={{ textDecoration: 'none' }}>
                <Tooltip title="Info">
                <IconButton sx={{ p: 1 }}>
                    <Avatar alt="Remy Sharp" src="https://ipfs.infura.io/ipfs/QmdNWFzAQhAuZ7YEX43RwK6HK63kZgb32DcE34bYYh6gPg" />
                </IconButton>
                </Tooltip>
            </Link>
            
          </Box>  
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Guidebar;