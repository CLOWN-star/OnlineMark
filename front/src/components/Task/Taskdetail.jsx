import React from "react";
import { useLocation} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useStyles } from "../Create/styles.js";

import Card  from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import Tooltip from '@mui/material/Tooltip';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link} from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AddAlertIcon from '@mui/icons-material/AddAlert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

 

const Taskdetail = ({tasks,imgs})  => {
    const classes = useStyles();
    const location = useLocation().pathname;
    let tmp = location.split('\/')
    let showtaskid = tmp[2]
    let showtaskdesc
    let showtaskowner
    let showtasktaker
    let showtaskstate
    let taskimgid = []
    let taskimgurl = []
    let taskimgstate = []
    let nowuser =  sessionStorage.getItem("login");
    tasks.map((task)=>{
        if(task.taskid==showtaskid){
            showtaskdesc = task.taskdesc
            showtaskowner = task.taskowner
            showtasktaker = task.tasktaker
            showtaskstate = task.taskstate
        }
    })

    const [expanded, setExpanded] = React.useState(false);
    const [showimg, setShowimg] = React.useState(0);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    imgs.map((img)=>{
        if(img.imgtask==showtaskid){
            taskimgid.push(img.imgid)
            taskimgurl.push(img.imguri)
            taskimgstate.push(img.state)
        }
    })

    function  giveup(event){      
        var url = '/giveup';//???????????????
        let formData = new FormData();  
        formData.append("taskid",showtaskid); 
        fetch(url, {
            method: 'POST',//post??????
            body: formData
        })
        .then(res => {res.json().
            then((data)=> {
                data.map((datas)=>{ 
                    console.log(datas.state); 
                    if(datas.state==1){
                        alert("????????????,?????????")
                    }
                    else{
                        alert("????????????,?????????")
                    }
                    
                })}
            )})
    }

    function  taketask(event){      
        var url = '/taketask';//???????????????
        let formData = new FormData();  
        formData.append("taskid",showtaskid); 
        formData.append("tasktaker", sessionStorage.getItem("login"));  
        fetch(url, {
            method: 'POST',//post??????
            body: formData
        })
        .then(res => {res.json().
            then((data)=> {
                data.map((datas)=>{ 
                    console.log(datas.state); 
                    if(datas.state==1){
                        alert("????????????,?????????")
                    }
                    else{
                        alert("????????????,?????????")
                    }
                    
                })}
            )})
    }

    function  alerttask(event){      
        var url = '/alerttask ';//???????????????
        let formData = new FormData();  
        formData.append("taskid",showtaskid); 
        fetch(url, {
            method: 'POST',//post??????
            body: formData
        })
        .then(res => {res.json().
            then((data)=> {
                data.map((datas)=>{ 
                    console.log(datas.state); 
                    if(datas.state==1){
                        alert("????????????,?????????")
                    }
                    else{
                        alert("????????????,?????????")
                    }
                    
                })}
            )})
    }





    return (
        <div className={classes.page}>
            <div className={classes.formHeader}>
                <h1>TaskDetails</h1>
                <Link to="/alltask"  onClick="refresh">
                    <CancelOutlinedIcon fontSize="large" />
                </Link>
            </div>
            <div style={{ display: "flex",flexDirection:"row",justifyContent:"center"}}>

                <Card sx={{ maxWidth: 450 }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={taskimgurl[showimg]}
                    />
                   
                    <CardContent>      
                        <div style={{float:'right' }}>{taskimgstate[showimg]==1?
                            <IconButton>
                                <CheckIcon />
                            </IconButton>
                            :
                            <IconButton>
                                <ClearIcon />
                            </IconButton>}
                        </div>
                        <div  style={{ display: 'flex'}}>
                            < DescriptionIcon/>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                {showtaskdesc}
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions disableSpacing>
                        
                        <Tooltip title="Last">
                            <IconButton onClick={()=>showimg!=0?setShowimg(showimg-1):alert("??????????????????")}>
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Take task">
                        {nowuser!=showtaskowner&&showtaskstate==0?                     //????????????
                           <IconButton onClick={taketask}>
                           <   SportsHandballIcon/>
                           </IconButton>  :
                           <IconButton disabled>
                               <SportsHandballIcon/>
                           </IconButton>}
                         </Tooltip>
                        
                         <Tooltip title="Alert">
                        {nowuser==showtaskowner&&showtaskstate!=0&&showtaskstate!=2?                     //??????
                           <IconButton onClick={alerttask}>
                           <   AddAlertIcon/>
                           </IconButton>  :
                           <IconButton disabled>
                               <AddAlertIcon/>
                           </IconButton>}
                         </Tooltip>

                         <Tooltip title="Mark">
                        {nowuser==showtasktaker&&showtaskstate!=0&&showtaskstate!=2?     //????????????????????????????????????
                            <Link to={`/mark/${taskimgid[showimg]}`}  onClick="refresh">
                           <IconButton >
                           <   BorderColorIcon/>
                           </IconButton></Link>:
                           <IconButton disabled>
                               <BorderColorIcon/>
                           </IconButton>}
                        </Tooltip>
                           
                        <Tooltip title="Check">
                        {nowuser!=showtasktaker&&showtaskstate==1?      //??????
                            <Link to={`/check/${taskimgid[showimg]}`}  onClick="refresh">
                            <IconButton >
                            <   SearchIcon/>
                            </IconButton></Link>:
                            <IconButton disabled>
                                <SearchIcon/>
                            </IconButton>}
                        </Tooltip>

                        <Tooltip title="GiveUp">
                        {nowuser==showtasktaker&&showtaskstate!=2?      //??????
                            
                            <IconButton  onClick={giveup}>
                            <   DeleteIcon/>
                            </IconButton>:
                            <IconButton disabled>
                                <DeleteIcon/>
                            </IconButton>}
                        </Tooltip>

                        

                        <Tooltip title="Next">
                            <IconButton onClick={()=>showimg!=taskimgurl.length-1?setShowimg(showimg+1):alert("?????????????????????")}>
                                <ArrowForwardOutlinedIcon/>
                            </IconButton>
                        </Tooltip>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>???????????????:{showtaskowner}</Typography>
                            <Typography paragraph>????????????:{showtaskid}</Typography>
                            <Typography paragraph>????????????:{showtaskdesc}</Typography>
                            <Typography paragraph>????????????:{showtaskstate==0?"?????????":(showtaskstate==1?"?????????":showtaskstate==-1?"???????????????":"?????????")}</Typography>
                            {showtaskstate==0?<></>:<Typography paragraph>?????????:{showtasktaker}</Typography>}
                        </CardContent>
                    </Collapse>
                </Card>

            </div>
        </div>
    )
}

export default Taskdetail;