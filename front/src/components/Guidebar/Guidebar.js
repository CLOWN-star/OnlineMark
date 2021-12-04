import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function BasicMenu() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>       
                <ul
                    style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}
                    className="navbar-nav ml-auto"
                >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                
                <Button color="inherit"  >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        home
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/about" >
                        about
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/task" >
                        tasks
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/mytask" >
                        mytask
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/taketask" >
                        tokentask
                    </Link>
                </Button>
                </ul>
                </Toolbar>
            </AppBar>
        </Box>        
        
    );
  }