import React,{useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Card1 from "../Card";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Card  from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

const Home = () => {
  const [ Count, SetCount ] = useState(0)
  const [ result,setResult ] = useState(0)
  const [account, setAccount] = useState()
  const [password, setPassword] = useState()
  
  const submitHandler = (e) => {
    console.log(account);
    console.log(password);

    let formData = new FormData();  
    formData.append("account",account);  
    formData.append("password",password);   
    var url = '/loginin';//传值的地址
    fetch(url, {
        method: 'POST',//post方法
        body: formData
    }).then(res => {res.json().
        then((data)=> {
            data.map((datas)=>{ 
                console.log(datas.result); 
                setResult(result=>datas.result) 
                sessionStorage.setItem("login",account);
                sessionStorage.setItem("loginstate",datas.result);
            })}
        )})
  };

  function  handleAccountChange(event){  
    setAccount(account=>event.target.value);
  }


  function  handlePasswordChange(event){  
    setPassword(password=>event.target.value);
  }

  function Loginprocess(users,login,hello){
   
    return(
      <div style={{ display: "flex",alignItems: "center", height:600}}>
        
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignContent ="center"
        >
            
          <Card sx={{ maxWidth: 300 }}>
            {result == "1"?
              <Alert severity="error">
                Error alert — <strong>Wrong password</strong>
              </Alert>
              :<div></div>}
            {result == "2"?
              <Alert severity="error">
                Error alert — <strong>Wrong Account</strong>
              </Alert>
              :<div></div>}
              {result == "3"?
              <Alert severity="success">
                  <strong>登录成功</strong>
              </Alert>
              :<div></div>}
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div> 
              
                  <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Account</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={'text'}
                      label="account"
                      value = {account}
                      onChange={handleAccountChange}
                      name="account"
                    />
                  </FormControl>

                  <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={Count ? 'text' : 'password'}
                      name="password"
                      value = {password}
                      onChange={handlePasswordChange}
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
                  {result == "3"?<div></div>:
                  <div>
                      <Link to="/register"  style={{ textDecoration: 'none' }}>
                        <Button size="big" >Register</Button>
                      </Link>
                    <Button size="big" onClick={submitHandler}>Login</Button>
                    </div>
                    }
                    
                  {result == "3"?
                   <Link to={`/`} style={{ textDecoration: 'none' }} onClick="refresh">
                    <Button size="big" >前往个人中心</Button>
                    </Link>
                :<div></div>}
                </CardActions>

              </div>
            </Box>
          </Card>  
        </Grid> 
      </div>
      
    );
  }


    
    
    if(sessionStorage.getItem("loginstate")==3){
    
      return (

        <div>
          <Link to="/mytask" style={{ textDecoration: 'none' }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              height
            >
              <Grid item key={1}>
                <h1></h1>
                <Card >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={1}
                      height="240"
                      image={'https://ipfs.infura.io/ipfs/QmdNWFzAQhAuZ7YEX43RwK6HK63kZgb32DcE34bYYh6gPg'}
                      title={1}
                    />
                    <CardContent className={1}>
                      <div className={1}>
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h5"}
                          gutterBottom
                        >
                        </Typography>
                        <Typography variant="h6" className={1}>
                          <span> Owner:{1}</span>
                        </Typography>
                        <Typography variant="h6" className={1}>
                          <span>Task:{2}</span>
                        </Typography>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>   
            </Grid>
          </Link> 
        </div>      

      );
    }
    else{
      
      return (

            Loginprocess()
      );
      
    }
    
};

export default Home;