import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Card from "../Card";
//import input from '@mui/material';
function loginprocess(users,login){
  return(
    <div>
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>用户名</label>
          <input type="text" class="mui-input-clear" placeholder="请输入用户名" />
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input type="password" class="mui-input-password" placeholder="请输入密码" />
        </div>
        <div class="mui-button-row">
          <button type="button" class="mui-btn mui-btn-primary" >确认</button>
          <button type="button" class="mui-btn mui-btn-danger" >取消</button>
        </div>
      </form>
    </div>
  );
}

const Home = ({users,login}) => {
  if(login[0] == 1){
    return (
      <Link to="/about" style={{ textDecoration: 'none' }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item key={1}>
          <Card />
          </Grid>   
        </Grid>
      </Link>         
    );
  }
  else{
    //login[0] = 1;
    return (
          loginprocess(users,login)
    );
    
  }
  
};

export default Home;