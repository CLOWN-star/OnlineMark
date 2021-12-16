import React, { useState, useEffect } from "react";
import Card1 from "../Card";
import Grid from "@material-ui/core/Grid";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
const Mytasks = ({tasks,imgs}) => {

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
        <div>
            <div >
                <h1>
                    Tasks
                </h1>
                <Link to="/create"  style={{ textDecoration: 'none' }}>
                    <Button >创建任务</Button>
                </Link>
            </div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {tasks.map((task)  => (
                    task.taskowner ==  sessionStorage.getItem("login")?
                    <Grid item key={task.taskid}>
                        <Card1 task = {task} img = {selectimg(task.taskid)} />
                    </Grid>
                    :<div></div>
                ))}
            </Grid>
            
        </div>
    )
}

export default Mytasks;