import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card  from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';

const Card1 = ({task,img}) => {

  return (
    
    <Link to={`/task/${task.taskid}`} style={{ textDecoration: 'none' }}>
      
       <Card >
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={img}
          />
          <CardContent >
            <div >
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                gutterBottom
              >
              </Typography>
              <Typography variant="h6">
                <span> Taskid:{task.taskid}</span>
              </Typography>
              <Typography variant="h6">
                <span>Taskdesc:{task.taskdesc}</span>
              </Typography>
              
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
     
     </Link>
    
  );
};

export default Card1;
