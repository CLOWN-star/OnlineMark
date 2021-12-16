import React, { Component } from "react"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Guidebar from "./components/Guidebar/Guidebar";
import Create from "./components/Create/Create";
import Mark from "./components/Mark/Mark";
import VideoCap from "./components/VideoCap/VideoCap";
import Register from "./components/Register/Register";
import Task from "./components/Task/Task";
import Mytasks from "./components/Mytasks/Mytasks";

var arr = ["a","b","c"]
export default class AppRouter extends Component {
   constructor(props) {
      super(props);
      this.state = {
          hello: "Hello world",
          isloading:0,
          id:"",
          tasks:[],
          imgs:[]
      };
  }

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
   
   componentWillMount = async () => {
      this.setState({lables:arr});    
      this.gettask();
      this.getimg();
      localStorage.setItem("file1","");
      localStorage.setItem("file2","");
      localStorage.setItem("file3","");
  }


  
render() {
     
      if (this.state.isloading!=2) {
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
                        />} 
                     />
   
                     <Route path="/mytask" 
                        element={<Mytasks
                           tasks = {this.state.tasks}
                           imgs  = {this.state.imgs}  
                        />} 
                     /> 

                     <Route path="/alltask" 
                        element={<Task
                           tasks = {this.state.tasks}
                           imgs  = {this.state.imgs}
                        />} 
                     /> 

                     <Route path="/mark" 
                        element={<Mark  
                        />} 
                     /> 

                     <Route path="/create" 
                        element={<Create  
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