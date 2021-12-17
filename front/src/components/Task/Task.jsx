import React, { useState, useEffect } from "react";
import Card1 from "../Card";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../Create/styles.js";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Task = ({tasks,imgs}) => {
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
    const [i, setI] = useState(1)

    return (
        <div  className={classes.page}>
            <div  className={classes.formHeader}>
                <h1>
                   ALL Tasks
                </h1>
            </div>
            <FormGroup style={{float:'right' }}>
                    <FormControlLabel  control={<Checkbox onClick={()=>{setI(!i);console.log(i)}} defaultChecked /> } label="只查看未接取项目" />
                </FormGroup>    
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {tasks.map((task)  => (
                    task.taskstate==0||(!i)?
                    <Grid item key={task.taskid}>
                        <Card1 task = {task} img = {selectimg(task.taskid)} />
                    </Grid>:<div></div>
                ))}
            </Grid>
        </div>
    )
}

export default Task;