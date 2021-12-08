import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
 
export default class CanvasComponent extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
        savex:[],
        savey:[],
        savepoint:[],
        savename:[],
        isdraw:1,
        choose:-1,
        color:'#000',
        choosecolor:'#000'
    };
    
  }

    initPainter = (props) => {
        let canvas = this.canvasRef.current;
        this.canvasContext = canvas.getContext('2d');
        var pointx = [];
        var pointy = [];
        var name = [];
        var crossflag =[];
        var img = new Image();
        img.src = 'https://ipfs.infura.io/ipfs/QmdNWFzAQhAuZ7YEX43RwK6HK63kZgb32DcE34bYYh6gPg'
        this.canvasContext.drawImage(img,100,100);
        let x = 0;
        let y = 0;
        let lastdown;
        let startflag = 0;
        let tmpflag = 0;
        let undoflag = 0;
        let pointoutflag = 0; 
        let blankpoint = 0;
        name.push("Undefine")
        this.canvasContext.lineWidth = 2;
        this.canvasContext.strokeStyle = '#000000';
    
        let onMouseDownEvent = (e) => {
            if(startflag!=0){
                pointx.pop();
                pointy.pop();
            }
            if(tmpflag!=0){
                pointx.pop();
                pointy.pop();
                tmpflag = 0;
            }
            startflag = 0
            if(lastdown!=3||e.which!=3){
                undoflag = 0;
                pointoutflag = 0;
                e.preventDefault();
                x = e.offsetX;
                y = e.offsetY;
                if(x>=100&&x<=100+img.width&&y>=100&&y<=100+img.height){
                    pointx.push(x);
                    pointy.push(y);
                    blankpoint = 0;
                }
                else{
                    this.setState({isdraw:0});
                    blankpoint = 1;
                }
                    
                draw();
                canvas.addEventListener('mousemove',onMouseMoveEvent )   
                if(e.which==3)
                    this.setState({isdraw:0});
            }
            else{
               
                undoflag = 1;
            }
            lastdown = e.which;

            draw();
        }

        let onMouseMoveEvent = (e) => {
            if(startflag!=0){
                pointx.pop();
                pointy.pop();
            }
            if(tmpflag!=0){
                pointx.pop();
                pointy.pop();
                tmpflag = 0;
            }
            if(blankpoint!=1)
                this.setState({isdraw:1});

            startflag =  1;  
            let newX = e.offsetX;
            let newY = e.offsetY;
            pointx.push(x);
            pointy.push(y);
            draw();
            x = newX;
            y = newY;
        }

        let draw = (e) => {       
            this.canvasContext.clearRect(0,0,800,600)
            this.canvasContext.drawImage(img,100,100);
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(pointx[0],pointy[0]);
            this.setState({savex:pointx});
            this.setState({savey:pointy});
            this.setState({savepoint:crossflag});
            this.setState({savename:name});
            let i = 0;
            let start;

            for(let j = 0;j<=crossflag.length;j++){
               
                if(j==crossflag.length){  //相当于绘制正在做的，还没有确定多少边  
                    start = i;
                    this.canvasContext.beginPath();
                    for(; i < pointx.length-1; i++) {
                        this.canvasContext.lineTo(pointx[i], pointy[i]);
                    }
                    this.canvasContext.stroke();
                    this.canvasContext.beginPath();
                    if(start!= pointx.length-1){
                        this.canvasContext.moveTo(pointx[ pointx.length-2],pointy[ pointx.length-2]);
                        this.canvasContext.lineTo(pointx[ pointx.length-1], pointy[pointx.length-1]);
                        this.canvasContext.stroke();
                    }
                    this.canvasContext.beginPath();
                    this.canvasContext.moveTo(pointx[ pointx.length-1],pointy[ pointx.length-1]);
                    this.canvasContext.lineTo(pointx[start], pointy[start]);
                    this.canvasContext.stroke();
                }
                else{                   //绘制之前的
                    
                    for(; i < crossflag[j]; i++) {
                        if(i==0||i == crossflag[j-1]){
                            this.canvasContext.beginPath();
                            if(j==this.state.choose){
                                this.canvasContext.strokeStyle = '#FF8C00';
                                this.canvasContext.lineWidth = 2;
                            }
                            else{
                                this.canvasContext.strokeStyle = '#000';
                                this.canvasContext.lineWidth = 2;
                            }
                            this.canvasContext.moveTo(pointx[i]+3,pointy[i]);       
                            this.canvasContext.arc(pointx[i],pointy[i],3,0,2*Math.PI);
                            this.canvasContext.fillStyle = this.state.choosecolor;
                            this.canvasContext.fill();
                            this.canvasContext.fillStyle = this.state.choosecolor;
                            this.canvasContext.font="15px Arial";
                            this.canvasContext.fillText(this.state.savename[j],pointx[i]-5,pointy[i]-5,100)

                            this.canvasContext.moveTo(pointx[i],pointy[i]);
                            this.canvasContext.lineTo(pointx[i+1], pointy[i+1]);  
                            this.canvasContext.stroke();
                        }
                        else if(i == crossflag[j]-1){       //最后一条边
                            this.canvasContext.beginPath();
                            this.canvasContext.moveTo(pointx[i]+3,pointy[i]);       
                            this.canvasContext.arc(pointx[i],pointy[i],3,0,2*Math.PI);
                            this.canvasContext.fillStyle = this.state.choosecolor;
                            this.canvasContext.fill();

                            this.canvasContext.moveTo(pointx[i], pointy[i]);
                            if(j==0){       //第一个图形
                                this.canvasContext.lineTo(pointx[0], pointy[0]);  
                            }
                            else{          //其他图形
                                this.canvasContext.lineTo(pointx[crossflag[j-1]], pointy[crossflag[j-1]]);  
                            }
                            this.canvasContext.stroke();
                        }
                        else{
                            this.canvasContext.beginPath();
                            this.canvasContext.moveTo(pointx[i]+3,pointy[i]);       
                            this.canvasContext.arc(pointx[i],pointy[i],3,0,2*Math.PI);
                            this.canvasContext.fillStyle = this.state.choosecolor;
                            this.canvasContext.fill();
                            this.canvasContext.moveTo(pointx[i],pointy[i]);
                            this.canvasContext.lineTo(pointx[i+1], pointy[i+1]);  
                            this.canvasContext.stroke();     
                        }
                       
                    }
                }
            }
            
        
        }

        canvas.addEventListener('mousedown',onMouseDownEvent )
        
        canvas.oncontextmenu = function (e) { 
            e.preventDefault(); 
            if(undoflag!=1){
                canvas.removeEventListener('mousemove',onMouseMoveEvent)
                if(crossflag.length != 0||name.length == 0){
                    name.push("Undefine")
                }
                crossflag.push(pointx.length);
            }
            else{
                if(pointoutflag == 0){
                    let now = crossflag.pop();
                    name.pop();
                    let last;
                    if(crossflag.length==0){
                        last = 0;

                    }
                    else{
                        last = crossflag.pop();
                        crossflag.push(last);
                    } 
                    pointoutflag = now - last-1;
                    
                }
                else{
                    pointoutflag--;
                }
                
                pointx.pop();
                pointy.pop();
                tmpflag  = 1;
                x = e.offsetX;
                y = e.offsetY;
                pointx.push(x);
                pointy.push(y);
                canvas.addEventListener('mousemove',onMouseMoveEvent )
            }
            draw();
        }; 
   
  }
 
  componentDidMount() {
    this.initPainter();
    
  }

    handleRadioChange = (event) => {
        this.setState({choose:event.target.value})
    };

    handleColorChange = (event) => {
        this.setState({choosecolor:event.target.value})
    };

    handleNameChange = (event) => {
        let tmp = [] ;
        tmp = this.state.savename;
        tmp[this.state.choose] =  event.target.value
        this.setState({savename:tmp})
    };



   drawsidebar() {
       if(this.state.isdraw!=0){
        return(
            <div>
              <Chip label="请先完成当前标注"/>  
            </div>          
        );
       }
       else
        return(
            <div>
            <FormControl component="fieldset">
                <Chip label="颜色"/>  
                <RadioGroup row aria-label="which" name="row-radio-buttons-group" value = {this.state.choosecolor} onChange={this.handleColorChange}>
                    <Radio value = '#000' color="default"/>
                    <Radio value = "#4682B4" color="info" />
                    <Radio value = '#3CB371' color="success" />
                    <Radio value = '#CD5C5C' color="error" />
                </RadioGroup>

                <Chip label="标注对象"/>  
                <RadioGroup row aria-label="which" name="row-radio-buttons-group" value = {this.state.choose} onChange={this.handleRadioChange}>
                    {
                    this.state.savename.map((item,index)=>{
                        return(
                        <FormControlLabel value={index} control={<Radio /> } label= {this.state.savename[index]}/>
                        )
                    })}
                </RadioGroup>
               

                <TextField label="Size" id="outlined-size-small" size="small" value = {this.state.choose==-1?"请选择一个标注":this.state.savename[this.state.choose]} onChange={this.handleNameChange}/>
            </FormControl>
            </div>          
        );
    }
 
  render() {
    return <>
      <canvas ref={this.canvasRef} id={'cav'} width={800} height={600} />
      {this.drawsidebar()}
    </>;
  }
}