import React, { useState, useCallback } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useDropzone} from 'react-dropzone';
import { useStyles } from "./styles.js";
import {create} from 'ipfs-http-client';
import Button from '@mui/material/Button';
import { AddLink } from '@mui/icons-material';


let buffer;

const DropZone = ({ onFileUploaded })  => {
  const classes = useStyles();
  const [showFile, setShowFile] = useState('');
  const [ Count, SetCount ] = useState(1)
  let addp
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  
  async function gen(){
      let result = await ipfs.add(buffer);  
      console.log("before");
      var file1 = localStorage.getItem("file1");
      var file2 = localStorage.getItem("file2");
      var file3 = localStorage.getItem("file3");  
      console.log(file1);
      console.log(file2);
      console.log(file3);  
      let URI = `https://ipfs.infura.io/ipfs/${result.path}`;    
       alert("上传成功") 
      if(file1==""){
        localStorage.setItem("file1",URI);
      } 
      else if(file2==""){
        localStorage.setItem("file2",URI);
      } 
      else if(file3==""){
        localStorage.setItem("file3",URI);
      }    
      console.log("emd");
      file1 = localStorage.getItem("file1");
      file2 = localStorage.getItem("file2");
      file3 = localStorage.getItem("file3"); 
      console.log(file1);
      console.log(file2);
      console.log(file3); 
  }

  function  handledelete(event){  
    if(Count==1){
      setShowFile(localStorage.getItem("file2"))
      var file2 = localStorage.getItem("file2");
      var file3 = localStorage.getItem("file3");  
      localStorage.setItem("file1",file2);
      localStorage.setItem("file2",file3);
    }
    else if(Count ==2 ){
      setShowFile(localStorage.getItem("file3"))
      var file3 = localStorage.getItem("file3"); 
      localStorage.setItem("file2",file3);
      localStorage.setItem("file3","");
      SetCount(2)
    }
    else{
      setShowFile(localStorage.getItem("file2"))
      localStorage.setItem("file3","");
      SetCount(2)
      } 
      var file1 = localStorage.getItem("file1");
      var file2 = localStorage.getItem("file2");
      var file3 = localStorage.getItem("file3"); 
      console.log(file1);
      console.log(file2);
      console.log(file3);
  }
  //tomgguoloucalstoragejiejue

  function  handlecross(event){  
    if(Count==1){
      setShowFile( localStorage.getItem("file1"))
    }
    else if(Count ==2 ){
      setShowFile(localStorage.getItem("file1"))
    }
    else{
      setShowFile(localStorage.getItem("file2"))
    }
    SetCount(Count => Count>1?Count-1:Count)
  }

  function  handleadd(event){  
    if(Count==1){
      setShowFile( localStorage.getItem("file2"))
    }
    else if(Count==2||Count ==3 ){
      setShowFile( localStorage.getItem("file3"))
    }
    SetCount(Count => Count<3?Count+1:Count)    
  }


  const onDrop = useCallback (acceptedFiles =>  {
    const file = acceptedFiles[0];

    var reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e){
      const img = new Image()
      img.src = reader.result;
      buffer = reader.result;
      gen();
     } 
    const fileUrl = URL.createObjectURL(file);
    console.log(fileUrl)
    setShowFile(fileUrl)
    onFileUploaded(file);
  }, [onFileUploaded]);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop, 
    accept: 'image/*'
  });
  
  return (
    <div>
    <div className={classes.dropzone} {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      { showFile 
        ? <img src={showFile} alt="Point thumbnail"/>
        : (
          <p>
            <CloudUploadIcon />
            Task Source
          </p>
        )
      }

      
    </div>
      <Button size="big" onClick={handlecross}>Back</Button>
      <Button size="big" onClick={handledelete}>Delete</Button>
      <Button size="big" onClick={handleadd}>Next</Button>
    </div>
  );
}

export default DropZone;