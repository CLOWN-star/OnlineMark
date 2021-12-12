import React, { useState, useCallback ,useRef} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useDropzone} from 'react-dropzone';
import { useStyles } from "./styles.js";
import {create} from 'ipfs-http-client';
import Button from '@mui/material/Button';
import { AddLink } from '@mui/icons-material';


let buffer;

const DropZone = ({ onFileUploaded ,GetselectFile, Back, Next, Delete})  => {
  const classes = useStyles();
  const [showFile, setShowFile] = useState("-1");
  const showFileRef = useRef(showFile);
  showFileRef.current = showFile;

  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  
  async function gen(){
      let result = await ipfs.add(buffer);  
      let URL = `https://ipfs.infura.io/ipfs/${result.path}`;    
      alert("上传成功") 
      onFileUploaded(URL)
      GetselectFile();
      let showfile = sessionStorage.getItem("chooseuploadimg")
      setShowFile(showfile)
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
  }, [onFileUploaded]);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop, 
    accept: 'image/*'
  });

  function  HandleBack(event){  
    console.log("desc")
    Back()
    let showfile = sessionStorage.getItem("chooseuploadimg")
    setShowFile(showfile)
  }

  function  HandleDelete(event){  
    console.log("desc")
    Delete()
    let showfile = sessionStorage.getItem("chooseuploadimg")
    setShowFile(showfile)
  }

  function  HandleNext(event){  
    console.log("desc")
    Next()
    let showfile = sessionStorage.getItem("chooseuploadimg")
    setShowFile(showfile)
  }
    
  return (
    <div>
        <div className={classes.dropzone} {...getRootProps()}>
        { showFileRef.current=="-1" 
            ? <input {...getInputProps()} accept='image/*' />
            : <div></div>
          }
          

          { showFileRef.current!="-1" 
            ? <img src={showFileRef.current} alt="Point thumbnail"/>
            : (
              <p>
                <CloudUploadIcon />
                Task Source
              </p>
            )
          }
        
        </div>
        <Button onClick={HandleBack}>Back</Button>
        { showFileRef.current!="-1" ? <Button onClick={HandleDelete}>Delete</Button>:
         <Button disabled>Delete</Button>}
        <Button onClick={HandleNext}>Next</Button>
    </div>
  );
}

export default DropZone;