import React , { useState }from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from "./styles.js";
import DropZone from "../../components/DropZone";
import { Link} from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card  from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

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
                        <Card sx={{ maxWidth: 300 }}>
                            <FormControl sx={{ m: 1, width: '32ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">DESC</InputLabel>
                                <OutlinedInput
                                    id="standard-helperText"
                                    type={'text'}
                                    label="Desc"
                                    type="search"
                                    variant="standard"
                                    onChange={event => setDesc(event.target.value)}
                                />

                            </FormControl>

                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={createTask}>
                                        Submit
                                    </Button>
                                </CardActions>
                            </Card>
                    </fieldset>
                </div>
            </form>          
        </div>
        )
    };

export default Create;

