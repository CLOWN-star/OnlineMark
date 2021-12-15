import React, { useState, useCallback ,useRef} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useDropzone} from 'react-dropzone';
import { useStyles } from "./styles.js";
import {create} from 'ipfs-http-client';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";


let buffer;

const DropZone = ({ onFileUploaded ,GetselectFile, Back, Next, Delete})  => {
  const classes = useStyles();
  const [showFile, setShowFile] = useState("-1");
  const [open, setOpen] = useState(0);
  const showFileRef = useRef(showFile);
  
  showFileRef.current = showFile;

  var url;
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
    console.log(file.type)
    url = URL.createObjectURL(file);
    sessionStorage.setItem("video",url)
    console.log("haha"+url)
    
    if(file.type =="video/mp4"){
      setOpen(1)
    }

    else{
      var reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      console.log("fileur;"+file)
      reader.onload = function(e){
        const img = new Image()
        img.src = reader.result;
        buffer = reader.result;
        gen();
       } 
    }
    
  }, [onFileUploaded]);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop, 
  });

  function  HandleBack(event){  
    console.log("desc")
    Back()
    let showfile = sessionStorage.getItem("chooseuploadimg")
    setShowFile(showfile)
  }
  
  function handleClose(event){
    setOpen(0)
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
            ? <input {...getInputProps()} />
            : <div></div>
          }
          { showFileRef.current!="-1" 
            ? <img src={ showFileRef.current} alt="Point thumbnail"/>
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
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>提示</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  您的输入类型为视频，请点击按钮前往截取
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link to="/videocap"  style={{ textDecoration: 'none' }}>
                <Button >前往截图</Button>
              </Link>
            </DialogActions>
          </Dialog>
        </div>
    </div>
  );
}

export default DropZone;