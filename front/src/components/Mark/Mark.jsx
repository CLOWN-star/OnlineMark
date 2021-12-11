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
        open:0
    };
    
  }

    draw = (pointx,pointy,crossflag,name) => {     
        this.canvasContext.clearRect(0,0,800,550)
        var img = new Image();
        img.src = 'https://ipfs.infura.io/ipfs/QmdNWFzAQhAuZ7YEX43RwK6HK63kZgb32DcE34bYYh6gPg'
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
                    
                canvas.addEventListener('mousemove',onMouseMoveEvent )   
                }
                else{
                    this.setState({isdraw:0});
                    blankpoint = 1;
                }

                if(e.which==3)
                    this.setState({isdraw:0});
            }
            else{
               
                undoflag = 1;
            }
            lastdown = e.which;
            if(e.which==3){
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
            }
            this.draw(pointx,pointy,crossflag,name);
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
            this.draw(pointx,pointy,crossflag,name);
            x = newX;
            y = newY;
        }

        let choosemodeMouseDown = (e)=>{
            
            x = e.offsetX;
            y = e.offsetY;
            this.setState({choosepoint:-1});
            for(let i = 0;i<pointx.length;i++){
                if(pointx[i]-x<5&&pointx[i]-x>-5){
                    if(pointy[i]-y<5&&pointy[i]-y>-5){
                        this.setState({choosepoint:i});
                    }        
                }

                if(this.state.choosepoint!=-1){
                    continue;
                }
                for(let k = 0;k<=crossflag.length-1;k++){//检测在哪个图形中
                    
                    if(i<crossflag[k]-1){
                        let x1 = pointx[i];
                        let x2 = pointx[i+1];
                        let y1 = pointy[i];
                        let y2 = pointy[i+1];
                        let varv = Math.atan((y2-y1)/(x2-x1))-Math.atan((y2-y)/(x2-x));
                        let between1 = (x2-x)*(x1-x)<0;
                        let between2 = (y2-y)*(y1-y)<0;
                        if(varv>=-0.1&&varv<=0.1&&between1&&between2){
                            let d1 = (x1-x)*(x1-x)+(y1-y)*(y1-y)
                            let d2 = (x2-x)*(x2-x)+(y2-y)*(y2-y)
                            if(d1>=100){
                                if(d2>=100){
                                    console.log("addpoint at"+i);
                                    for(let tmp = k;tmp<crossflag.length;tmp++){
                                        crossflag[tmp] = crossflag[tmp]+1;
                                    }
                                    pointx.push(pointx[pointx.length-1]);
                                    pointy.push(pointy[pointy.length-1]);
                                    for(let tmp = pointx.length-3;tmp>i;tmp--){
                                        pointx[tmp+1] = pointx[tmp]
                                        pointy[tmp+1] = pointy[tmp]
                                    }
                                    pointx[i+1] = x 
                                    pointy[i+1] = y
                                    console.log(crossflag)
                                }
                            }
                        }
                        break;
                    }
                    else if(i == crossflag[k]-1){
                        if(k == 0){
                            let x1 = pointx[i];
                            let x2 = pointx[0];
                            let y1 = pointy[i];
                            let y2 = pointy[0];
                            let varv = Math.atan((y2-y1)/(x2-x1))-Math.atan((y2-y)/(x2-x));
                            let between1 = (x2-x)*(x1-x)<0;
                            let between2 = (y2-y)*(y1-y)<0;
                            if(varv>=-0.1&&varv<=0.1&&between1&&between2){
                                let d1 = (x1-x)*(x1-x)+(y1-y)*(y1-y)
                                let d2 = (x2-x)*(x2-x)+(y2-y)*(y2-y)
                                if(d1>=100){
                                    if(d2>=100){
                                        console.log("addpoint at"+i);
                                        for(let tmp = k;tmp<crossflag.length;tmp++){
                                            crossflag[tmp] = crossflag[tmp]+1;
                                        }
                                        pointx.push(pointx[pointx.length-1]);
                                        pointy.push(pointy[pointy.length-1]);
                                        for(let tmp = pointx.length-3;tmp>i;tmp--){
                                            pointx[tmp+1] = pointx[tmp]
                                            pointy[tmp+1] = pointy[tmp]
                                        }
                                        pointx[i+1] = x 
                                        pointy[i+1] = y
                                        console.log(crossflag)
                                    }
                                }
                            }
                        }
                        else{
                            let x1 = pointx[i];
                            let x2 = pointx[crossflag[k-1]];
                            let y1 = pointy[i];
                            let y2 = pointy[crossflag[k-1]];
                            let varv = Math.atan((y2-y1)/(x2-x1))-Math.atan((y2-y)/(x2-x));
                            let between1 = (x2-x)*(x1-x)<0;
                            let between2 = (y2-y)*(y1-y)<0;
                            if(varv>=-0.1&&varv<=0.1&&between1&&between2){
                                let d1 = (x1-x)*(x1-x)+(y1-y)*(y1-y)
                                let d2 = (x2-x)*(x2-x)+(y2-y)*(y2-y)
                                if(d1>=100){
                                    if(d2>=100){
                                        console.log("addpoint at"+i);
                                        for(let tmp = k;tmp<crossflag.length;tmp++){
                                            crossflag[tmp] = crossflag[tmp]+1;
                                        }
                                        pointx.push(pointx[pointx.length-1]);
                                        pointy.push(pointy[pointy.length-1]);
                                        for(let tmp = pointx.length-3;tmp>i;tmp--){
                                            pointx[tmp+1] = pointx[tmp]
                                            pointy[tmp+1] = pointy[tmp]
                                        }
                                        pointx[i+1] = x 
                                        pointy[i+1] = y
                                        console.log(crossflag)
                                    }
                                }
                            }

                        }
                        break;
                    }

                }
                
            }
            //console.log("choose"+this.state.choosepoint);
            this.draw(pointx,pointy,crossflag,name);
            canvas.addEventListener('mousemove',startdrugpoint);
            canvas.addEventListener('mouseup',enddrugpoint);
            //这里感觉是增加一个监视拖拽，然后增加move，在draw里面增加一个变大
        }

        let startdrugpoint = (e)=>{                                             //拖动函数
            x = e.offsetX;
            y = e.offsetY;
            pointx[this.state.choosepoint]=x;
            pointy[this.state.choosepoint]=y;
            this.draw(pointx,pointy,crossflag,name);
        }

        let enddrugpoint = (e)=>{                                             //保持检测函数
            canvas.removeEventListener('mousemove',startdrugpoint);
            canvas.removeEventListener('mouseup',enddrugpoint);
        }


        let modetest = (e)=>{                                             //保持检测函数
            if(this.state.choosemode==0){
                canvas.removeEventListener('mousedown',choosemodeMouseDown )
                canvas.addEventListener('mousedown',onMouseDownEvent )
            }
            else{
                canvas.removeEventListener('mousedown',onMouseDownEvent )
                canvas.addEventListener('mousedown',choosemodeMouseDown )
            }

        }

        canvas.oncontextmenu = function (e) { 
            e.preventDefault(); 
        }; 
        canvas.addEventListener('mousedown',onMouseDownEvent )
        canvas.addEventListener('mousemove',modetest )
    }
 
    componentDidMount() {
        this.initPainter();
        
    }

    handleRadioChange = (event) => {
        this.setState({choose:event.target.value},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    handleXChange = (event) => {
        
        let tmp = [] ;
        tmp = this.state.savex;
        tmp[this.state.choosepoint] =  parseInt(event.target.value);
        if(tmp[this.state.choosepoint]>=0&&tmp[this.state.choosepoint]<=this.state.imgw+100){
            this.setState({savex:tmp},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
        }
         console.log(this.state.imgw) 
         console.log(this.state.imgh)   
    };

    handleYChange = (event) => {
        let tmp = [] ;
        tmp = this.state.savey;
        tmp[this.state.choosepoint] =  parseInt(event.target.value);
        if(tmp[this.state.choosepoint]>=0&&tmp[this.state.choosepoint]<=this.state.imgh+100)
            this.setState({savey:tmp},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    handleColorChange = (event) => {
        this.setState({choosecolor:event.target.value},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    handlefilefloderChange = (event) => {
        this.setState({filefloder:event.target.value},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    handlefilenameChange = (event) => {
        this.setState({filename:event.target.value},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    handlefilepathChange = (event) => {
        this.setState({filepath:event.target.value},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    showpositionnumber = (event) => {
        this.setState({showposition:!this.state.showposition},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    handleNameChange = (event) => {
        let tmp = [] ;
        tmp = this.state.savename;
        tmp[this.state.choose] =  event.target.value
        this.setState({savename:tmp},()=>{this.draw(this.state.savex,this.state.savey,this.state.savepoint,this.state.savename)})
    };

    handleClickOpen = () => {
        this.setState({open:true})
      };
    
    handleClose = () => {
        this.setState({open:false})
      };

      

    handleDelete = (event)=>{
        this.setState({choosepoint:-1})
        let tmpx =[];
        tmpx = this.state.savex;
        let tmpy =[];
        tmpy = this.state.savey;
        let tmppoint =[];
        tmppoint = this.state.savepoint;
        let tmpname =[];
        tmpname = this.state.savename;


        let m;
        if(this.state.choose==0){
            m = tmppoint[this.state.choose];
        }
        else{
            m = tmppoint[this.state.choose]-tmppoint[this.state.choose-1];
        }
        for(let i = this.state.choose==0?0:tmppoint[this.state.choose-1]; i<tmppoint[tmppoint.length-1]; i++){
            if(i+m<tmppoint[tmppoint.length-1]){
                tmpx[i]=tmpx[i+ m];
                tmpy[i]=tmpy[i+ m];
            }
        }
        for(let i = this.state.choose==0?0:tmppoint[this.state.choose-1];i<tmppoint[this.state.choose];i++){
            tmpx.pop();
            tmpy.pop();
        }
 
        for( let i= this.state.choose-1;i<tmppoint.length-1;i++){
            if(i>=this.state.choose){
                tmppoint[i] = this.state.savepoint[i+1]-m;
                tmpname[i] = this.state.savename[i+1];
            }
            
        }
        tmppoint.pop();
        tmpname.pop();   
        this.setState({choose:-1},()=>{this.draw(tmpx,tmpy,tmppoint,tmpname)})
        
    }
    

    exportfile = (event) => {
        this.setState({open:false})
        var FileSaver = require('file-saver');
        let data = "<annotation>";
        data = data + "<folder>"+this.state.filefloder+"</folder>\n";
        data = data +"<filename>"+this.state.filename+"</filename>\n";
        data = data +"<path>"+this.state.filepath+"</path>\n";
        data = data +"<source>\n<database>Unknown</database>\n</source>\n";
        data = data +"<size>\n";
        data = data +"<width>"+this.state.imgw+"</width>\n";
        data = data +"<height>"+this.state.imgh+"</height>\n";
        data = data +"<depth>3</depth>\n";
        data = data +"</size>\n";
        
        data = data +"<segmented>0</segmented>\n";
        for(let i = 0;i<this.state.savepoint.length;i++){
            console.log(i)
            data = data +"<object>\n";
            data = data +"<name>"+this.state.filename[i]+"</name>\n";
            data = data +"<pose>Unspecified</pose>\n";
            data = data +"<truncated>0</truncated>\n";
            data = data +"<difficult>0</difficult>\n";
            data = data +"<polygon>\n";
            if(i==0){
                for(let j = 1;j<=this.state.savepoint[i];j++){
                    data = data +"<x"+j+">"+(this.state.savex[j-1]-100)+"</x"+j+">\n";
                    data = data +"<y"+j+">"+(this.state.savey[j-1]-100)+"</y"+j+">\n";
                }
            }
            else{
                for(let j = 1;j<=this.state.savepoint[i] - this.state.savepoint[i-1];j++){
                    data = data +"<x"+j+">"+(this.state.savex[j+this.state.savepoint[i-1]-1]-100)+"</x"+j+">\n";
                    data = data +"<y"+j+">"+(this.state.savey[j+this.state.savepoint[i-1]-1]-100)+"</y"+j+">\n";
                }
            }
            data = data +"</polygon>\n";
            data = data +"</object>\n";
        }
        data = data + "</annotation>";
        var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "mark.xml");
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
            <div style={{ alignItems: "flex-start"}}>
                 <TextField label="标注对象名" id="outlined-size-small"  size="small" value = {this.state.choose==-1?"未选择":this.state.savename[this.state.choose]} onChange={this.handleNameChange}/>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '15ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Chip label="标注对象"/>  
                    <RadioGroup  aria-label="which" name="row-radio-buttons-group" value = {this.state.choose} onChange={this.handleRadioChange}>
                        {
                        this.state.savename.map((item,index)=>{
                            return(
                            <FormControlLabel value={index} control={<Radio /> } label= {this.state.savename[index]}/>
                            )
                        })}
                    </RadioGroup>
                </Box>
                <div  style={{  flexDirection: "column",display: "flex"}}>
                    
                   
                    <Button  variant="contained" onClick ={this.handleDelete}>Delele select</Button>    
                </div>      
            </div>          
        );
    }

 
  render() {

    return (
        <div>
            <div style={{ display: "flex",alignItems: "center"}}>
            
                    <canvas ref={this.canvasRef} id={'cav'} width={800} height={550} />
                    {this.drawsidebar()}
            </div>  
            {this.state.isdraw?
            <div>
               
            </div>
            :
            <div>
                 <div  style={{ display: "flex",alignItems: "center"}}>
                    <div>
                        <div  style={{ display: "flex"}}>
                            <div>
                                <FormControlLabel control={<Switch  
                                checked={this.state.choosemode==false?"defaultChecked":""}
                                onClick={() => this.setState({choosemode:!this.state.choosemode})}
                                /> } label="标注模式" />
                            </div>
                            <div>
                            <FormControlLabel control={<Switch  
                                checked={this.state.showposition==true?"defaultChecked":""}
                                onClick={this.showpositionnumber}
                            /> } label="坐标显示" />
                            </div>
                        </div>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '10ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Button size="big" variant="contained" onClick ={this.handleClickOpen}>save</Button>
                            <Button size="big" variant="contained" onClick ={this.handleClickOpen}>export</Button>
                        </Box>
                    </div>
                    <div>
                        <  Chip label="显示颜色选择"/>  
                        <RadioGroup row aria-label="which" name="row-radio-buttons-group" value = {this.state.choosecolor} onChange={this.handleColorChange}>
                            <Radio value = '#000' color="default"/>
                            <Radio value = "#4682B4" color="info" />
                            <Radio value = '#3CB371' color="success" />
                            <Radio value = '#CD5C5C' color="error" />
                        </RadioGroup>
                    </div>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '10ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField label="选择点x坐标" id="outlined-size-small"  defaultValue = "0" size="small" value = {this.state.choosepoint==-1?"未选择":this.state.savex[this.state.choosepoint]} onChange={this.handleXChange}/>
                        </div>
                        <div>
                            <TextField label="选择点y坐标" id="outlined-size-small" defaultValue = "0" size="small" value = {this.state.choosepoint==-1?"未选择":this.state.savey[this.state.choosepoint]} onChange={this.handleYChange}/>
                        </div>
                        
                    </Box>
                    
                    
                </div>
                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle>导出xml</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            请输入正确的导出信息
                        </DialogContentText>
                        <TextField  autoFocus fullWidth  variant="standard"  margin="dense"label="图片文件名" id="outlined-size-small" defaultValue = "0" size="small" value = {this.state.filename} onChange={this.handlefilenameChange}/>
                        <TextField  fullWidth   variant="standard" margin="dense"label="图片文件夹信息" id="outlined-size-small" defaultValue = "0" size="small" value = {this.state.filefloder}onChange={this.handlefilefloderChange}/>
                        <TextField  fullWidth   variant="standard"  margin="dense"label="图片路径" id="outlined-size-small" defaultValue = "0" size="small" value = {this.state.filepath} onChange={this.handlefilepathChange}/>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.exportfile}>Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            }       
        </div>
   );
  }
}