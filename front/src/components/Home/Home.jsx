import React,{useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Card1 from "../Card";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Card  from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


  
const submitHandler = (e) => {
  //this.goNext();
};


function Loginprocess(users,login){
  const [ Count, SetCount ] = useState(0)
  return(
    <div>
      
      <div>
          <Button size="small"></Button>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent ="center"
      >
        
        <Card sx={{ maxWidth: 300 }}>
         
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {login[0].state == "3"?
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>Wrong password</strong>
              </Alert>
              :<div></div>}
            {login[0].state == "2"?
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>Wrong Account</strong>
              </Alert>
              :<div></div>}


            <div> 
            <form action="/receive" method="post" onSubmit={submitHandler}>
              <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Account</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={'text'}
                  label="account"
                  name="account"
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={Count ? 'text' : 'password'}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>SetCount(count => !count)}
                        edge="end"
                        name="password"
                      > 
                        {Count ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
             
              <CardActions>
                <Button size="big">Register</Button>
                <Button size="big" type="submit">Login</Button>
              </CardActions>

              </form>
            </div>
          </Box>
        </Card>  
      </Grid> 
    </div>
    
  );
}

const Home = ({users,login}) => {
  
  
  if(login[0].state == "1"){
   
    return (
      <div>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            container spacing={3}
          >
            <Grid item key={1}>
              <Card1 />
            </Grid>   
          </Grid>
        </Link> 
      </div>        
    );
  }
  else{
    
    return (
          Loginprocess(users,login)
    );
    
  }
  
};

export default Home;