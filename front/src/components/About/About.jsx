//home.js
import React , { Component }from 'react';
import { api } from "../../service/api";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
let value;
var arr = ["a","b","c"]

const About = ({users,login}) =>  {


  return (
     <div style={{ maxWidth: "100%" }}>
      <div>
          {login[0]}
      </div>

      <MaterialTable 
        columns={[
          { title: "ID", field: "userid" },
          { title: "Name", field: "name" },
        ]}
        data = {users}
        title="Demo Title"
      />
    </div>   
    
     
  )
}


export default About;