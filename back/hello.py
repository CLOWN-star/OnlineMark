from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.types import CHAR, Integer, String
from sqlalchemy import Column
from flask import request
import json

BaseModel = declarative_base()

app = Flask(__name__)


DB_CONNECT = 'mysql+pymysql://root:20020118czr@localhost:3306/imgmark'
engine = create_engine(DB_CONNECT, echo=True)
DB_Session = sessionmaker(bind=engine)
session = DB_Session()
connect = ["0","Name"]

class User(BaseModel):
    __tablename__ = 'user'
    userid = Column(Integer,primary_key=True)
    name = Column(CHAR(45))
    mail = Column(CHAR(45))
    password = Column(CHAR(45))
   

class Task(BaseModel):
    __tablename__ = 'task'
    taskid = Column(Integer,primary_key=True)
    taskdesc = Column(CHAR(100))
    taskowner = Column(Integer)
    tasktaker = Column(Integer)
    taskstate = Column(Integer)


class IMG(BaseModel):
    __tablename__ = 'img'
    imgid = Column(Integer,primary_key=True)
    imgtask = Column(Integer)
    imguri = Column(CHAR(100))
    markx = Column(CHAR(300))
    marky = Column(CHAR(300))
    point = Column(CHAR(100))
    pointname = Column(CHAR(300))


@app.route('/helloworld', methods=['GET', 'POST'])
def hello_world(): 
    return "Hello World"


@app.route('/createtask', methods=['GET', 'POST'])
def createtask(): 
    fileurl = request.form.get('fileurl')
    owner = request.form.get('owner')
    desc = request.form.get('desc')
    sql = "insert into task(taskdesc,taskowner,tasktaker,taskstate) values(\""+desc+"\",\""+owner+"\",0,0)"
    engine.execute(sql)
    sql = "select taskid from task where taskdesc = \""+desc+"\" and taskowner =\""+owner+"\"order by taskid desc limit 1"
    selectid =  engine.execute(sql)
    for select in selectid:
        taskid = select[0]
    lists = fileurl.split(',') 
    for list in lists:
        sql = "insert into img(markx,marky,point,pointname,imgtask,imguri) values(0,0,0,0,"+str(taskid)+",\""+list+"\")"
        print(sql)
        engine.execute(sql)
    test = {'state':taskid}
    list = []
    list.append(test)
    return json.dumps(list)


@app.route('/savemark', methods=['GET', 'POST'])
def savemark(): 
    imgid = request.form.get('imgid')
    markx = request.form.get('markx')
    marky = request.form.get('marky')
    savepoint = request.form.get('point')
    savename = request.form.get('pointname')
    sql = "update img set markx = \""+str(markx)+"\",marky=\""+str(marky)+"\",point=\""+ str(savepoint)+ "\",pointname =\"" +str(savename)+"\" where(imgid = \""+str(imgid)+"\")"
    engine.execute(sql)
    test = {'state':1}
    list = []
    list.append(test)
    return json.dumps(list)


@app.route('/getinfo', methods=['GET', 'POST'])
def getinfo(): 
    imgid = request.form.get('imgid')
    sql = "select * from img  where(imgid =\""+str(imgid)+"\")"
    print(sql)
    selectImg = engine.execute(sql)
    test = {}
    list = []
    for img in selectImg:
        px = img[3]
        py = img[4]
        pp = img[5]
        ppn = img[6]
        pointx = px.split(',')
        pointy = py.split(',')
        point  = pp.split(',')
        pointname = ppn.split(',')
        test = {'imgid': imgid, 'markx': pointx, 'marky':pointy, 'point':point ,'pointname':pointname}
        list.append(test)
    print(list)
    return json.dumps(list)


@app.route('/register', methods=['GET','POST'])
def register():
    account = request.form.get('account')
    password = request.form.get("password")
    email = request.form.get("email")
    # print(email)
    list = []
    selectUser = engine.execute("select * from user where name = \""+account+"\"")
    test = {'result':"0"}
    wrong = 0
    i = 0
    for itmes in selectUser:
        i = i + 1
    if i != 0:
       test = {'result':"1"}
       wrong = 1
    selectEmail = engine.execute("select * from user where mail = \""+email+"\"")
    i = 0
    for itmes in selectEmail:
        i = i + 1
    if i != 0:
        test = {'result':"2"}
        wrong = 1
    if(wrong != 1):
        str = "INSERT INTO user (name, password, mail) VALUES ('"+account+"','"+password+"','"+email+"')"
        engine.execute(str)
    list.append(test)
    return json.dumps(list)


@app.route('/loginin', methods=['GET', 'POST'])
def loginin(): 
    account = request.form.get("account")
    password = request.form.get("password")
    print(account)
    print(password)
    test = {'result':"0"}
    list = []
    if(account==""):
        test = {'result':"2",'account':account}
        list.append(test)
        return json.dumps(list)
    selectUser = engine.execute("select * from user where name =\""+account+"\"")
    i = 0
    for userItem in selectUser:
        i = i + 1
        if(userItem[2] == password):
            test = {'result':"3" ,'account':account}
            list.append(test)
            return json.dumps(list)
    if(i == 0):
        test = {'result':"2"}
        list.append(test)
        return json.dumps(list)
    else:
        test = {'result':"1"}
        list.append(test)
        return json.dumps(list)


@app.route('/getconnect', methods=['GET', 'POST'])
def getconnect(): 
    test = {'state':connect[0],'userid':connect[1]}
    list = []
    list.append(test)
    return json.dumps(list)


@app.route('/getuser', methods=['GET', 'POST'])
def getuser():
    cookie = request.values.get("cookie")
    if cookie == "20020118czr":
        selectUser = engine.execute("select * from user")
        test = {}
        list = []
        for userItem in selectUser:
            print(userItem)
            test = {'userid': userItem[0], 'name': userItem[1], 'password': userItem[2], 'mail': userItem[3]}
            list.append(test)
        return json.dumps(list)
    else:
        return "error"


from urllib.parse import urlparse, urljoin
 




@app.route('/gettask', methods=['GET', 'POST'])
def gettask():
    cookie = request.values.get("cookie")
    if cookie == "20020118czr":
        selectUser = engine.execute("select * from task")
        test = {}
        list = []
        for userItem in selectUser:
            test = {'taskid': userItem[0], 'taskdesc': userItem[1],  'taskowner': userItem[2], 'tasktaker': userItem[3], 'taskstate': userItem[4]}
            list.append(test)
        return json.dumps(list)
    else:
        return "error"


@app.route('/getimg', methods=['GET', 'POST'])
def getimg():
    cookie = request.values.get("cookie")
    if cookie == "20020118czr":
        selectUser = engine.execute("select * from img")
        test = {}
        list = []
        for userItem in selectUser:
            test = {'imgid': userItem[0], 'imgtask': userItem[1], 'imguri': userItem[2]}
            list.append(test)
        return json.dumps(list)
    else:
        return "error"


if __name__=='__main__':
    app.run(host="127.0.0.1", port=5000,debug=True)