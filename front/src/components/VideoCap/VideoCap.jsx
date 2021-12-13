import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
 
export default class CanvasComponent extends React.Component {
    
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

    draw = (video) => {     
        let con =   this.canvasContext 
        let can =  this.canvasRef.current
        this.canvasContext.clearRect(0,0,1000,600)  
        const a = document.createElement('a')      
        con.drawImage(video, 0, 0,1000,600);
        const IMG_TYPE = "png"
        const b64 = can.toDataURL('image/' + IMG_TYPE);
        a.setAttribute('href', b64);
        const filename = "测试图" + "." + IMG_TYPE
        a.setAttribute('download', filename);
        a.click()
        drawvideo()
        function drawvideo(){
            con.drawImage(video, 0, 0,1000,600);
            window.requestAnimationFrame(drawvideo);
        }
    }

    initPainter = (props) => {
        let canvas = this.canvasRef.current;
        this.canvasContext = canvas.getContext('2d');

        let showfile = sessionStorage.getItem("video")
        console.log(showfile)

        const video = document.createElement('video'); //  创建video 用来存放被截图的视频
        video.src = showfile
        console.log(video.height/video.width)
        video.onloadeddata = () => {
            video.play()
        }

        let onMouseDownEvent = (e) => {
            this.draw(video);
        }
        canvas.addEventListener('mousedown',onMouseDownEvent )
    }
 
    componentDidMount() {
        this.initPainter();
    }
 
  render() {

    return (
        <div>
            <canvas ref={this.canvasRef} id={'cav'} width={1000} height={600} />    
        </div>
   );
  }
}
