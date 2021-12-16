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
    this.state = {
        savex:[],
        savey:[],
        savepoint:[],
        savename:[],
        isdraw:1,
        choose:-1,
        color:'#000',
        changeflag:0,
        choosecolor:'#000',
        choosemode:0,
        choosepoint:-1,
        showposition:0,
        imgw:0,
        imgh:0,
        filefloder:"",
        filename:"",
        filepath:"",
        open:0,
        showimgurl:'',
        showimgid:''
    };
    
  }

    draw = (pointx,pointy,crossflag,name,url) => {     
        this.canvasContext.clearRect(0,0,800,550)
        var img = new Image();
        img.src = url
        this.setState({imgw:img.width})
        this.setState({imgh:img.height})
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
                if(i!= pointx.length){
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
            }
            else{                   //绘制之前的
                if(j==this.state.choose){
                    this.canvasContext.strokeStyle = '#FF8C00';
                    this.canvasContext.lineWidth = 2;
                }
                for(; i < crossflag[j]; i++) {
                    let r=(i==this.state.choosepoint?4:2);
                    if(i==0||i == crossflag[j-1]){
                        this.canvasContext.beginPath();
                        this.canvasContext.moveTo(pointx[i]+r,pointy[i]);       
                        this.canvasContext.arc(pointx[i],pointy[i],r,0,2*Math.PI);
                        
                        this.canvasContext.fillStyle = (i==this.state.choosepoint?'#DC143C':this.state.choosecolor);
                        this.canvasContext.fill();
                        this.canvasContext.fillStyle = this.state.choosecolor;
                        this.canvasContext.font="15px Arial";
                        this.canvasContext.fillText(this.state.savename[j],pointx[i]-10,pointy[i]-10,100)
                        this.canvasContext.beginPath();
                        this.canvasContext.moveTo(pointx[i],pointy[i]);
                        this.canvasContext.lineTo(pointx[i+1], pointy[i+1]);  
                        this.canvasContext.stroke();
                        if(this.state.showposition==true){
                            this.canvasContext.font="10px Arial";
                            this.canvasContext.fillText("["+pointx[i]+","+pointy[i]+"]",pointx[i]+5,pointy[i]+5,100)
                        }
                    }
                    else if(i == crossflag[j]-1){       //最后一条边
                        this.canvasContext.beginPath();
                        this.canvasContext.moveTo(pointx[i]+r,pointy[i]);       
                        this.canvasContext.arc(pointx[i],pointy[i],r,0,2*Math.PI);
                        this.canvasContext.fillStyle = (i==this.state.choosepoint?'#DC143C':this.state.choosecolor);
                        this.canvasContext.fill();
                        this.canvasContext.fillStyle = this.state.choosecolor; 
                        this.canvasContext.beginPath();
                        this.canvasContext.moveTo(pointx[i], pointy[i]);
                        if(j==0){       //第一个图形
                            this.canvasContext.lineTo(pointx[0], pointy[0]);  
                        }
                        else{          //其他图形
                            this.canvasContext.lineTo(pointx[crossflag[j-1]], pointy[crossflag[j-1]]);  
                        }
                        this.canvasContext.stroke();
                        if(this.state.showposition==true){
                            this.canvasContext.font="10px Arial";
                            this.canvasContext.fillText("["+pointx[i]+","+pointy[i]+"]",pointx[i]+5,pointy[i]+5,100)
                        }
                    }
                    else{
                        this.canvasContext.beginPath();
                        this.canvasContext.moveTo(pointx[i]+r,pointy[i]);       
                        this.canvasContext.arc(pointx[i],pointy[i],r,0,2*Math.PI);
                        this.canvasContext.fillStyle = (i==this.state.choosepoint?'#DC143C':this.state.choosecolor);
                        this.canvasContext.fill();
                        
                        this.canvasContext.fillStyle = this.state.choosecolor;
                        this.canvasContext.beginPath();
                        this.canvasContext.moveTo(pointx[i],pointy[i]);
                        this.canvasContext.lineTo(pointx[i+1], pointy[i+1]);  
                        this.canvasContext.stroke();    
                        if(this.state.showposition==true){
                            this.canvasContext.font="10px Arial";
                            this.canvasContext.fillText("["+pointx[i]+","+pointy[i]+"]",pointx[i]+5,pointy[i]+5,100)
                        } 
                    }
                
                }
                this.canvasContext.strokeStyle = '#000';
                this.canvasContext.lineWidth = 2;
            }
        }
    }

    initPainter = (props) => {
        let getimgurl
        var img = new Image();
        let getinfo = (event) => {
            let path = window.location.href
            let tmp = path.split('\/')
            let imgid = tmp.slice(-1)
            console.log("imggggggg"+imgid)
            var url = '/getinfo';//传值的地址
            let formData = new FormData(); 
            formData.append("imgid",imgid);  
            fetch(url, {
                method: 'POST',//post方法
                body: formData
            })
            .then(res => {res.json().
                then((data)=> {
                    data.map((datas)=>{ 
                        let imgurl = datas.imgurl
                        let ix = datas.markx
                        let iy = datas.marky
                        let ip = datas.point
                        let ipp = datas.pointname
                        console.log("xxxxx"+imgurl)
                        img.src = imgurl
                        this.setState({showimgurl:imgurl})
                        this.draw(ix,iy,ip,ipp,imgurl)
                       
                    })}
                )})
        };
        
        let canvas = this.canvasRef.current;
        this.canvasContext = canvas.getContext('2d');
        this.setState({isdraw:0})
        var pointx = [];
        var pointy = [];
        var name = [];
        var crossflag =[];
        
        getinfo();
        
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
        
        canvas.oncontextmenu = function (e) { 
            e.preventDefault(); 
        }; 
    }
 
    componentDidMount() {
        this.initPainter();
    }

    handlepass = (event) => {
        var url = '/pass';//传值的地址
        let formData = new FormData();  
        let path = window.location.href
        let tmp = path.split('\/')
        let imgid = tmp.slice(-1)
        formData.append("imgid",imgid); 
        fetch(url, {
            method: 'POST',//post方法
            body: formData
        })
        .then(res => {res.json().
            then((data)=> {
                data.map((datas)=>{ 
                    console.log(datas.state); 
                    if(datas.state==1){
                        alert("审核成功,请返回")
                    }
                    else{
                        alert("审核失败,请刷新")
                    }
                    
                })}
            )})
    };

    handlenotpass = (event) => {
        var url = '/notpass';//传值的地址
        let formData = new FormData();  
        let path = window.location.href
        let tmp = path.split('\/')
        let imgid = tmp.slice(-1)
        formData.append("imgid",imgid); 
        fetch(url, {
            method: 'POST',//post方法
            body: formData
        })
        .then(res => {res.json().
            then((data)=> {
                data.map((datas)=>{ 
                    console.log(datas.state); 
                    if(datas.state==1){
                        alert("审核成功,请返回")
                    }
                    else{
                        alert("审核失败,请刷新")
                    }
                    
                })}
            )})
    };

    drawsidebar() {
        return(
            <div  style={{  flexDirection: "column",display: "flex"}}>
                 <Button  variant="outlined"  color="success" onClick ={this.handlepass}>Pass</Button>  
                <Button  variant="outlined" color="error" onClick ={this.handlenotpass}>Not Pass</Button>    
            </div>      
        )
    }

  render() {
    return (
        <div>
            <div style={{ display: "flex",alignItems: "center"}}>
            
                    <canvas ref={this.canvasRef} id={'cav'} width={800} height={550} />
                    {this.drawsidebar()}
            </div>  
            
        </div>
   );
  }
}
