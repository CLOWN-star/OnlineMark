import React , { useState,useRef }from 'react';
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



const Create = () => {
    let fileurl =[];
    let select = -1;
    let filenumber = 0
    const classes = useStyles();


    const [desc, setDesc] = useState()
    
    function  SelectedFile(event){  
        select = filenumber;
        filenumber++;
        console.log("url = "+event)
        console.log("s"+select+"f"+filenumber)
        fileurl.push(event);   
    }

    function  GetSlelctedFile(event){  
        sessionStorage.setItem("chooseuploadimg",fileurl[select]);
    }

    function  Back(event){  
        
        if(select==0||select==-1){
            alert("已经是第一张")
        }
        else{
            select = select - 1;
            sessionStorage.setItem("chooseuploadimg",fileurl[select]);
        }
        console.log("s"+select+"f"+filenumber)
    }

    function  Next(event){  
        
        if(select==filenumber||select==-1){
            alert("请上传图片")
        }
        else if(select==filenumber-1){
            select++;
            sessionStorage.setItem("chooseuploadimg","-1");
        }
        else{
            select++;
            sessionStorage.setItem("chooseuploadimg",fileurl[select]);
        }
        console.log("s"+select+"f"+filenumber)
    }

    function  Delete(event){  
        if(filenumber==1){
            fileurl.pop();
            select = -1;
            filenumber = 0;
            sessionStorage.setItem("chooseuploadimg","-1");
        }
        else if(select==filenumber-1&&select!=0){
            fileurl.pop();
            select = select-1;
            filenumber--;
            sessionStorage.setItem("chooseuploadimg",fileurl[select]);
        }
        else{
            console.log("chufa")
            let tmp = fileurl;
            for(let i = select;i <tmp.length-1;i++){
                tmp[i] = tmp[i+1]
            }
            tmp.pop();
            console.log(tmp)
            fileurl = tmp;
            filenumber--;
            sessionStorage.setItem("chooseuploadimg",fileurl[select]);
        }
        console.log("s"+select+"f"+filenumber)
    }

    function  createTask(event){  
        console.log(desc)
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
                         <DropZone onFileUploaded={SelectedFile} GetselectFile={GetSlelctedFile} Back={Back} Next={Next} Delete={Delete}/>
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