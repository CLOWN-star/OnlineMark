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
    tel = Column(CHAR(45))
    mail = Column(CHAR(45))
    password = Column(CHAR(45))

class Task(BaseModel):
    __tablename__ = 'task'
    taskid = Column(Integer,primary_key=True)
    taskdesc = Column(CHAR(100))
    endtime = Column(Integer)
    taskowner = Column(Integer)
    tasktaker = Column(Integer)
    taskstate = Column(Integer)

class IMG(BaseModel):
    __tablename__ = 'img'
    imgid = Column(Integer,primary_key=True)
    imgtask = Column(Integer)
    imguri = Column(CHAR(100))


class MARK(BaseModel):
    __tablename__ = 'mark'
    markid = Column(Integer,primary_key=True)
    markimg = Column(Integer)
    startx = Column(Integer)
    starty = Column(Integer)
    endx = Column(Integer)
    endy = Column(Integer)


@app.route('/helloworld', methods=['GET', 'POST'])
def hello_world(): 
    return "Hello World"


@app.route('/receive', methods=['GET', 'POST'])
def receive(): 
    account = request.form.get("account")
    password = request.form.get("password")
    selectUser = engine.execute("select * from user where userid ="+account)
    test = {}
    i = 0
    for userItem in selectUser:
        i = i + 1
        test = {'userid': userItem[0], 'name': userItem[1], 'password': userItem[2], 'tel': userItem[3], 'mail': userItem[4]}
        if(userItem[2] == password):
            connect[0] = 1
            connect[1] = account
            return redirect("http://localhost:3000/")
    if(i == 0):
        connect[0] = 2
    else:
        connect[0] = 3
    return redirect("http://localhost:3000/")


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
            test = {'userid': userItem[0], 'name': userItem[1], 'password': userItem[2], 'tel': userItem[3], 'mail': userItem[4]}
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
            test = {'taskid': userItem[0], 'taskdesc': userItem[1], 'endtime': userItem[2], 'taskowner': userItem[3], 'tasktaker': userItem[4], 'taskstate': userItem[5]}
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


@app.route('/getmark', methods=['GET', 'POST'])
def getmark():
    cookie = request.values.get("cookie")
    if cookie == "20020118czr":
        selectUser = engine.execute("select * from mark")
        test = {}
        list = []
        for userItem in selectUser:
            test = {'markid': userItem[0], 'markimg': userItem[1], 'startx': userItem[2], 'starty': userItem[3], 'endx': userItem[4], 'endy': userItem[5]}
            list.append(test)
        return json.dumps(list)
    else:
        return "error"



if __name__=='__main__':
    app.run(host="127.0.0.1", port=5000)