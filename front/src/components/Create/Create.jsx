import React , { useState }from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from "./styles.js";
import DropZone from "../../components/DropZone";
import { Link} from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import Button from '@mui/material/Button';


var name;
var desc;

const Create = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [desc, setDesc] = useState()


   function  createTask(event){  
        event.preventDefault();
        var file1 = localStorage.getItem("file1");
        var file2 = localStorage.getItem("file2");
        var file3 = localStorage.getItem("file3");
        console.log(desc);
    }


    
    
    return (
        <div className={classes.page}>
            <form>
                <div className={classes.formHeader}>
                    <h1>Create Task</h1>
                    <Link to="/">
                        <CancelOutlinedIcon fontSize="large" />
                    </Link>
                </div>
                <div className={classes.content}>
                    <div className={classes.dropzone}>
                         <DropZone onFileUploaded={setSelectedFile} />
                    </div>
                    <fieldset>

                        <TextField
                            id="standard-password-input"
                            label="Desc"
                            type="text"
                            variant="standard"
                            name="desc"
                            onChange={event => setDesc(event.target.value)}
                        />
                        
                        <Button variant="contained" color="primary" onClick={createTask}>
                            Submit
                        </Button>
                    </fieldset>
                </div>
            </form>          
        </div>
        )
    };

export default Create;

