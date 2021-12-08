import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function App({users,login}) {
  return (
    <div style={{ height: 300, width: '100%' }}>
      {login[0].state}
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}



// import React , { Component }from 'react';
// import { api } from "../../service/api";
// import Button from "@material-ui/core/Button";
// import MaterialTable from "material-table";
// let value;
// var arr = ["a","b","c"]

// const About = ({users,login}) =>  {


//   return (
//      <div style={{ maxWidth: "100%" }}>
//       <div>
//           {login[0]}
//       </div>

//       <MaterialTable 
//         columns={[
//           { title: "ID", field: "userid" },
//           { title: "Name", field: "name" },
//         ]}
//         data = {users}
//         title="Demo Title"
//       />
//     </div>   
    
     
//   )
// }


// export default About;