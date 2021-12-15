import React from "react";
import { Link} from "react-router-dom";
import Button from '@mui/material/Button';
import CapZone from "../../components/CapZone";
import {create} from 'ipfs-http-client';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

export default class CanvasComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            filepath:[],
            choose:-1,
            desc:''
        };
    }

    change=()=>{
        let tmp;
        tmp = sessionStorage.getItem("uploadedimg")
        if(tmp!="-1"){
            let m =[];
            m = this.state.filepath;
            m.push(tmp)
            this.setState({filepath:m})
            sessionStorage.setItem("uploadedimg","-1")
            console.log("push!!!!")
        }
    }

    draw = (video,mode) => {     
        let con =   this.canvasContext 
        let can =  this.canvasRef.current
        let buffer
        sessionStorage.setItem("uploadedimg","-1")
        this.canvasContext.clearRect(0,0,900,600)  
        video.width=300;
        video.height=180;
        const a = document.createElement('a')      
        con.drawImage(video, 0, 0,900,500);
        if(mode!=0){
            const IMG_TYPE = "png"
            const b64 = can.toDataURL('image/' + IMG_TYPE);
            let f = dataURLtoBlob(b64);
            a.setAttribute('href', b64);
            const filename = "测试图" + "." + IMG_TYPE
            a.setAttribute('download', filename);
            this.change();
            a.click()
            var reader = new window.FileReader();
            reader.readAsArrayBuffer(f);
            let tmp = this.state.filepath;
            let m = tmp.length;
            this.setState({choose:m})
            reader.onload = function(e){
                const img = new Image()
                img.src = reader.result;
                buffer = reader.result;
                gen();    
            } 
        }
        drawvideo()

        function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        }


        function drawvideo(){
            con.drawImage(video, 0, 0,900,500);
            window.requestAnimationFrame(drawvideo);
        }

        const ipfs = create({
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
          });

        async function gen(){
            let result = await ipfs.add(buffer);  
            let URL = `https://ipfs.infura.io/ipfs/${result.path}`;   
            console.log(URL) 
            sessionStorage.setItem("uploadedimg",URL)
            alert("上传成功") 
        }
      
    }

    initPainter = (props) => {
        let canvas = this.canvasRef.current;
        this.canvasContext = canvas.getContext('2d');
        sessionStorage.setItem("uploadedimg","-1")
        sessionStorage.setItem("selectimg","-1")
        let showfile = sessionStorage.getItem("video")
        console.log(showfile)
        const video = document.createElement('video'); //  创建video 用来存放被截图的视频
        video.src = showfile
        setInterval(this.change, 1000);   
        video.controls = true;
        video.id = "video"
        document.body.appendChild(video);
        this.draw(video,0);
        console.log(video.height/video.width)
        video.onloadeddata = () => {
            video.play()
        }

        let onMouseDownEvent = (e) => {
            this.draw(video,1);
        }

        canvas.addEventListener('mousedown',onMouseDownEvent )
    }
 
    componentDidMount() {
        this.initPainter();
    }

      
    stop = () => {
        document.body.removeChild(document.getElementById("video"));
        

        var url = '/createtask';//传值的地址
        let formData = new FormData();  
        formData.append("fileurl",this.state.filepath); 
        formData.append("desc",this.state.desc);
        formData.append("owner", sessionStorage.getItem("login"));    
        fetch(url, {
            method: 'POST',//post方法
            body: formData
        })
        .then(res => {res.json().
            then((data)=> {
                data.map((datas)=>{ 
                    console.log(datas.state); 
                    alert("创建成功，您的任务编号是"+datas.state)
                })}
            )})
    }

    GetselectFile=()=>{
        let url = this.state.filepath;
        let select = this.state.choose;
        if(select!=-1&&select!=url.length)
            sessionStorage.setItem("selectimg",url[select])
        else if(select==url.length){
            sessionStorage.setItem("selectimg","-1")
        }
    }

    Back=()=>{
        let url = this.state.filepath;
        let select = this.state.choose;
        if(select==0||select==-1){
            alert("已经是第一张")
        }
        else{
            this.setState({choose:select-1})
            sessionStorage.setItem("selectimg",url[select])
        }
       
    }

    Next=()=>{
        let url = this.state.filepath;
        let select = this.state.choose;
        if(select==url.length-1||url.length==0){
            alert("已经是最后一张")
        }
        else{
            this.setState({choose:select+1})
            sessionStorage.setItem("selectimg",url[select])        
        }
       
    }

    Delete=()=>{
        let url = this.state.filepath;
        let select = this.state.choose;
        if(url.length==1){
            url.pop();
            this.setState({filepath:url})
            sessionStorage.setItem("selectimg",-1)        
        }
        else if(url.length-1==select&&select!=0){
            url.pop();
            select = select -1;
            this.setState({filepath:url})
            this.setState({choose:select})
            sessionStorage.setItem("selectimg",url[select])    
        }
        else{
            for(let i = select;i <url.length-1;i++){
                url[i] = url[i+1]
            }
            url.pop();
            this.setState({filepath:url})
            sessionStorage.setItem("selectimg",url[select])
        }
       
    }


 
  render() {
    
    return (
        <div style={{ display: "flex",alignItems: "center"}}>
            <canvas ref={this.canvasRef} id={'cav'} width={900} height={500} />  
            <div>
                <div style={{ minWidth: "300px"}}>
                    <CapZone GetselectFile={this.GetselectFile} Back={this.Back} Next={this.Next} Delete={this.Delete}/>
                </div>
                <FormControl sx={{ m: 1, width: '40' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">DESC</InputLabel>
                    <OutlinedInput
                        id="standard-helperText"
                        type={'text'}
                        label="Desc"
                        type="search"
                        variant="standard"
                        onChange={event => this.setState({desc:event.target.value})}
                    />
                </FormControl>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" onClick={this.stop}>发布任务</Button>  
                </Link>
            </div>
        </div>
   );
  }
}
