import React, { Component } from "react"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Guidebar from "./components/Guidebar/Guidebar";
import Create from "./components/Create/Create";
import Mark from "./components/Mark/Mark";
import VideoCap from "./components/VideoCap/VideoCap";
import Register from "./components/Register/Register";

var arr = ["a","b","c"]
export default class AppRouter extends Component {
   constructor(props) {
      super(props);
      this.state = {
          hello: "Hello world",
          isloading:0,
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
                     this.setState({isloading:this.state.isloading+1});
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
                     this.setState({isloading:this.state.isloading+1});
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
                     this.setState({isloading:this.state.isloading+1});
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
                     this.setState({isloading:this.state.isloading+1});
                  }
            )}
         );  
   };

   getconnect(){
      console.log("app"+this.state.hello)
      let uri =  "/getconnect"
      fetch(uri, {method: 'GET'}).then((res)=>{res.json().
            then((data)=> {
               console.log(data);  
                     data.map((datas)=>{
                        this.setState({login: [...this.state.login, datas],});
                        } 
                        
                     )     
                     this.state.login.map((user)=>{
                        console.log(user);  
                     })                  
                     this.setState({isloading:this.state.isloading+1});
                     
                  }
              
            )}
         );  
   };
   
   componentWillMount = async () => {
      this.setState({lables:arr});
      this.getuser();    
      this.gettask();
      this.getimg();
      this.getmark();
      this.getconnect();
      localStorage.setItem("file1","");
      localStorage.setItem("file2","");
      localStorage.setItem("file3","");
     
  }


  
render() {
     
      if (this.state.isloading!=5) {
         return <p>isLoading...</p>
      }
      else{
         return (
         
            <div>
               
               <BrowserRouter basename="/">
                  <Guidebar />
                  <Routes>
                     <Route path="/"  
                        element={<Home
                           users = {this.state.users}
                           login = {this.state.login} 
                           hello = {this.state.hello}
                        />} 
                     />
   
                     <Route path="/mytask" 
                        element={<Create
                        />} 
                     /> 

                     <Route path="/mark" 
                        element={<Mark  
                        />} 
                     /> 

                     <Route path="/videocap" 
                        element={<VideoCap  
                        />} 
                     /> 

                     <Route path="/register" 
                        element={<Register  
                        />} 
                     /> 

                     <Route path="/about" 
                        element={<About
                           users = {this.state.users}
                           login = {this.state.login} 
                           hello = {this.state.hello}
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
 }