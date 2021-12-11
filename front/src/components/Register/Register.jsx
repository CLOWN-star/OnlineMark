import React , { useState,useRef }from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from "./styles.js";
import DropZone from "../../components/DropZone";
import { Link} from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CardActions from '@mui/material/CardActions';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';

const Register = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [desc, setDesc] = useState()

    const [account, setAccount] = useState()
    const [wrongaccount, setWrongaccount] = useState()
    const accountRef = useRef(account);
    accountRef.current = account

    const [password, setPassword] = useState()
    const [wrongpassword, setWrongpassword] = useState()
    const passwordRef = useRef(password);
    passwordRef.current = password

    const [same, setSame] = useState()
    const [wrongsame, setWrongsame] = useState()
    const sameRef = useRef(same);
    sameRef.current = same;

    const [email, setEmail] = useState()
    const [wrongemail, setWrongemail] = useState()
    const emailRef = useRef(email);
    emailRef.current = email;

    const [regstate, setRegstate] = useState()

    function  handleAccountChange(event){  
        setAccount(account=>event.target.value);
        setTimeout(() => {
            setWrongaccount(false)
            let tmp=[];
            tmp = accountRef.current;
            for(let i = 0;tmp[i];i++){
                let ass = tmp[i].charCodeAt();
                if((ass>=48&&ass<=57)||(ass>=65&&ass<=90)||(ass>=97&&ass<=122)||ass==95){   
                }
                else{
                    setWrongaccount(true)
                }
            }
            
        }, 500);
    }

    function  handlePasswordChange(event){  
        setPassword(password=>event.target.value);
        setTimeout(() => {
            setWrongpassword(false)
            let tmp=[];
            tmp = passwordRef.current;
            let i;
            for( i= 0;tmp[i];i++){
            }
            if(i<6){
                setWrongpassword(true) 
            }
            
        }, 500);
    }

    function  handleSameChange(event){  
        setSame(same=>event.target.value);
        setTimeout(() => {
            setWrongsame(false)
            let tmp=[];
            tmp = sameRef.current;
            let right=[];
            right = passwordRef.current;
            let i;
            if(!right){
                setWrongsame(true)
                return
            }
            for( i= 0;tmp[i]&&right[i];i++){
                if(right[i]!=tmp[i]){
                    break;
                }
            }
            if(tmp[i]||right[i]){
                setWrongsame(true)
            }
            
        }, 500);
    }

    function  handleEmailChange(event){  
        setEmail(email=>event.target.value);
        setTimeout(() => {
            setWrongemail(false)
            let tmp=[];
            tmp = emailRef.current;
            let mark1 = 0,mark2 = 0;
            for(let i = 0;tmp[i];i++){
                let ass = tmp[i].charCodeAt();
                if(ass==64){
                    mark1 = 1;
                }
                if(mark1==1&&ass==46){
                    mark2 = 1;
                }
            }
            if(mark1!=1||mark2!=1){
                setWrongemail(true)
            }
        }, 500);
    }

    function subregister(event){
        let formData = new FormData();  
        formData.append("account",account);  
        formData.append("password",password);  
        formData.append("email",email);  
        var url = '/register';//传值的地址
        fetch(url, {
            method: 'POST',//post方法
            body: formData
        }).then(res => {res.json().
            then((data)=> {
                data.map((datas)=>{ 
                    console.log(datas.result);  
                    setRegstate(regstate=>datas.result)
                })}
            )})

    };
    
    return (
        <div className={classes.page}>
            <form>
                <div className={classes.formHeader}>
                    <h1>Register</h1>
                    <Link to="/">
                        <CancelOutlinedIcon fontSize="large" />
                    </Link>
                </div>
                {regstate == "0"?
                    <Alert severity="success">
                    Success alert — <strong>注册成功</strong>
                    </Alert>
                    :<div></div>}
                {regstate == "1"?
                    <Alert severity="error">
                    Error alert — <strong>账号已存在</strong>
                    </Alert>
                    :<div></div>}
                {regstate == "2"?
                    <Alert severity="error">
                    Error alert — <strong>邮箱已存在</strong>
                    </Alert>
                    :<div></div>}
                <div >
                    <div className={classes.content}>
                        <div className={classes.dropzone}>
                            <DropZone onFileUploaded={setSelectedFile} />
                        </div>
                        <fieldset>
                            { !wrongaccount?
                            <FormControl  variant="standard" >
                                <InputLabel htmlFor="component-error">用户名</InputLabel>
                                <Input
                                    id="component-error"
                                   
                                    value = {account}
                                    onChange={handleAccountChange}
                                />
                                <FormHelperText id="component-error-text">请输入用户名，只包含数字字母</FormHelperText>
                            </FormControl>
                            :<FormControl  error variant="standard"> 
                                <InputLabel htmlFor="component-error">用户名</InputLabel>
                                <Input
                                    id="component-error"
                                    
                                    value = {account}
                                    onChange={handleAccountChange}
                                />
                                <FormHelperText id="component-error-text">请输入用户名，只包含数字字母</FormHelperText>
                            </FormControl>
                            }


                            { !wrongpassword?
                            <FormControl  variant="standard" >
                                <InputLabel htmlFor="component-error">密码</InputLabel>
                                <Input
                                    id="component-error"
                                    
                                    value = {password}
                                    type = "password"
                                    onChange={handlePasswordChange}
                                />
                                <FormHelperText id="component-error-text">请输入密码，最少六位</FormHelperText>
                            </FormControl>
                            :<FormControl  error variant="standard"> 
                                <InputLabel htmlFor="component-error">密码</InputLabel>
                                <Input
                                    id="component-error"
                                   
                                    value = {password}
                                    type = "password"
                                    onChange={handlePasswordChange}
                                />
                                <FormHelperText id="component-error-text">请输入密码，最少六位</FormHelperText>
                            </FormControl>
                            }

                            { !wrongsame?
                            <FormControl  variant="standard" >
                                <InputLabel htmlFor="component-error">确认密码</InputLabel>
                                <Input
                                    id="component-error"
                                    
                                    value = {same}
                                    type = "password"
                                    onChange={handleSameChange}
                                />
                                <FormHelperText id="component-error-text">请保证两次密码一致</FormHelperText>
                            </FormControl>
                            :<FormControl  error variant="standard"> 
                                <InputLabel htmlFor="component-error">确认密码</InputLabel>
                                <Input
                                    id="component-error"
                                    
                                    value = {same}
                                    type = "password"
                                    onChange={handleSameChange}
                                />
                                <FormHelperText id="component-error-text">请保证两次密码一致</FormHelperText>
                            </FormControl>
                            }

                        { !wrongemail?
                            <FormControl  variant="standard" >
                                <InputLabel htmlFor="component-error">邮箱地址</InputLabel>
                                <Input
                                    id="component-error"
                                    
                                    value = {email}
                                    onChange={handleEmailChange}
                                />
                                <FormHelperText id="component-error-text">请输入格式正确的邮箱地址</FormHelperText>
                            </FormControl>
                            :<FormControl  error variant="standard"> 
                                <InputLabel htmlFor="component-error">邮箱地址</InputLabel>
                                <Input
                                    id="component-error"
                                    
                                    value = {email}
                                    onChange={handleEmailChange}
                                />
                                <FormHelperText id="component-error-text">请输入格式正确的邮箱地址</FormHelperText>
                            </FormControl>
                            }


                            {/* <FormControl  variant="standard" >
                                <InputLabel htmlFor="component-error">github用户名</InputLabel>
                                <Input
                                    id="component-error"
                                    
                                   
                                />
                                <FormHelperText id="component-error-text">请输入您的github用户名</FormHelperText>
                            </FormControl> */}
                            {   account&&password&&same&&email&&!wrongaccount&&!wrongpassword&&!wrongsame&&!wrongemail?
                                <CardActions>                      
                                    <Button variant="contained" color="primary" onClick={subregister}>
                                        Submit
                                    </Button>
                                </CardActions>
                                :
                                <CardActions>                      
                                <Button variant="contained" color="primary" disabled>
                                    Submit
                                </Button>
                            </CardActions>
                            }

                            
                        </fieldset>
                    </div>
                </div>
            </form>          
        </div>
        )
    };

export default Register;

