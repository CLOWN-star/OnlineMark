import React, { Component } from "react"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Guidebar from "./components/Guidebar/Guidebar";

var arr = ["a","b","c"]
export default class AppRouter extends Component {
   constructor(props) {
      super(props);
      this.state = {
          hello: "Hello world",
          isloading:false,
          id:"",
          login:[],    //第一位是否登录，第二位用户id
          users:[],
          tasks:[],
          imgs:[],
          marks:[]
      };
  }

   

   getuser(){
      let uri =  "/getuser?cookie=20020118czr"
      fetch(uri, {method: 'GET'}).then((res)=>{res.json().
            then((data)=> {
               console.log(data);  
                     data.map((datas)=>{ 
                        this.setState({users: [...this.state.users, datas],});
                        }
                     )                    
                     this.setState({isloading:false});
                  }
            )}
         );  
   };

   gettask(){
      let uri =  "/gettask?cookie=20020118czr"
      fetch(uri, {method: 'GET'}).then((res)=>{res.json().
            then((data)=> {
               console.log(data);  
                     data.map((datas)=>{ 
                        this.setState({tasks: [...this.state.tasks, datas],});
                        }
                     )                    
                     this.setState({isloading:false});
                  }
            )}
         );  
   };

   getimg(){
      let uri =  "/getimg?cookie=20020118czr"
      fetch(uri, {method: 'GET'}).then((res)=>{res.json().
            then((data)=> {
               console.log(data);  
                     data.map((datas)=>{ 
                        this.setState({imgs: [...this.state.imgs, datas],});
                        }
                     )                    
                     this.setState({isloading:false});
                  }
            )}
         );  
   };

   getmark(){
      let uri =  "/getmark?cookie=20020118czr"
      fetch(uri, {method: 'GET'}).then((res)=>{res.json().
            then((data)=> {
               console.log(data);  
                     data.map((datas)=>{ 
                        this.setState({marks: [...this.state.marks, datas],});
                        }
                     )                    
                     this.setState({isloading:false});
                  }
            )}
         );  
   };
   
   componentWillMount = async () => {
      this.setState({isloading:true});
      this.setState({lables:arr});
      this.getuser();    
      this.gettask();
      this.getimg();
      this.getmark();
  }


  
render() {
     let {isLoading} = this.state
 　　if (isLoading) {
 　　　　return <p>isLoading...</p>
 　　}
     return (
        <div>
           <BrowserRouter basename="/">
           <Guidebar />
               <Routes>
               
                  <Route path="/"  
                     element={<Home
                        users = {this.state.users}
                        login = {this.state.login} 
                     />} 
                  />

                  <Route path="/about" 
                     element={<About
                        users = {this.state.users}
                        login = {this.state.login} 
                     />} 
                  /> 

                  <Route path="/task/:taskid"                   //任务详情
                     element={<About
                        tasks = {this.state.tasks}
                        imgs = {this.state.imgs}
                     />} 
                  /> 
             </Routes>
           </BrowserRouter>
        </div> 
       ); 
     
   }
 }