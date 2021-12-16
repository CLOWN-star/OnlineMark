import React, { useState, useEffect } from "react";
import Card1 from "../Card";
import Grid from "@material-ui/core/Grid";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useStyles } from "../Create/styles.js";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const DoTask = ({tasks,imgs}) => {
    const classes = useStyles();
    function selectimg(id){
        let url = 0
        imgs.map((img)=>{
            if(img.imgtask==id&&url==0){
                url = img.imguri
            }
        })
        console.log(url)
        return url
    }

    return (
        <div className={classes.page}>
            <div className={classes.formHeader}>
                <h1>
                    DO Tasks
                </h1>
            </div>
            
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {tasks.map((task)  => (
                    task.tasktaker ==  sessionStorage.getItem("login")?
                    <Grid item key={task.taskid}>
                        <Card1 task = {task} img = {selectimg(task.taskid)} />
                    </Grid>
                    :<div></div>
                ))}
            </Grid>
            
        </div>
    )
}

export default DoTask;