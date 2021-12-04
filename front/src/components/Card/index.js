import React from "react";
import { Link } from "react-router-dom";

import { Card as MuiCard } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { useStyles } from "./styles.js";

const Card = ({ taskid, taskdesc, endtime, taskowner, taskstate}) => {
  const classes = useStyles();
  return (
    <Link to={`/task/${taskid}`} style={{ textDecoration: 'none' }}>
       <MuiCard className={1}>
       
        <CardActionArea>
          <CardMedia
            component="img"
            alt={1}
            height="240"
            image={'https://ipfs.infura.io/ipfs/QmdNWFzAQhAuZ7YEX43RwK6HK63kZgb32DcE34bYYh6gPg'}
            title={1}
          />
          
          <CardContent className={1}>
            <div className={1}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                gutterBottom
              >
              </Typography>
              <Typography variant="h6" className={1}>
                <span> Owner:{taskowner}</span>
              </Typography>
              <Typography variant="h6" className={1}>
                <span>Task：{2}</span>
              </Typography>
              <Chip
                  size='medium'
                  label= { taskstate ?  'Can Take' : 'Can’t Take' }
                  color =  { taskstate ?  'primary' : 'success' }
              />
            </div>
          </CardContent>
          
        </CardActionArea>
        
      </MuiCard>
     </Link>
  );
};

export default Card;
