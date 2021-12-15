import React, { useState, useRef} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useStyles } from "./styles.js";
import Button from '@mui/material/Button';


const CapZone = ({ GetselectFile, Back, Next, Delete})  => {
  const classes = useStyles();
  const [showFile, setShowFile] = useState("-1");
  const showFileRef = useRef(showFile);
  showFileRef.current = showFile;
  var listener;



  listener = setInterval(Getchoose, 100)   
  function  HandleBack(event){  
    Back()
    let nowshowfile = sessionStorage.getItem("selectimg")
    setShowFile(nowshowfile)
    listener = setInterval(Getchoose, 100)   
    console.log(showFileRef.current)
  }

  function  HandleDelete(event){  
    Delete()
    let nowshowfile = sessionStorage.getItem("selectimg")
    setShowFile(nowshowfile)
    listener = setInterval(Getchoose, 100)   
    console.log(showFileRef.current)
  }

  function  HandleNext(event){  
    Next()
    let nowshowfile = sessionStorage.getItem("selectimg")
    setShowFile(nowshowfile)
    listener = setInterval(Getchoose, 100)   
    console.log(showFileRef.current)
  }

  function  Getchoose(event){  
    GetselectFile()
    let nowshowfile = sessionStorage.getItem("selectimg")
    console.log("getnow"+nowshowfile)
    setShowFile(nowshowfile)
    if(nowshowfile!="-1"){
      clearInterval(listener);
    }
  }
    
  return (
    <div>
        <div className={classes.dropzone} >
        
          { showFileRef.current!="-1" 
            ? <img src={showFileRef.current} alt="Point thumbnail"/>
            : <p>
                <CloudUploadIcon />
                Click to Capture
              </p>
          }
        </div>
        <Button onClick={HandleBack}>Back</Button>
        { showFileRef.current!="-1" ? <Button onClick={HandleDelete}>Delete</Button>:
         <Button disabled>Delete</Button>}
        <Button onClick={HandleNext}>Next</Button>
        
        
    </div>
   
  );
}

export default CapZone;