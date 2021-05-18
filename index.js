const express = require('express');
const dfff = require('dialogflow-fulfillment');
var moment = require('moment-timezone');
const firebase = require('firebase');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

var timeZone = moment.tz("Asia/Ho_Chi_Minh");

const firebaseConfig = {
    apiKey: "AIzaSyCV1TXkXu5ZE7CkI-tFSnaH9WPSXv4CFbk",
    authDomain: "projectiot-c5a07.firebaseapp.com",
    databaseURL: "https://projectiot-c5a07-default-rtdb.firebaseio.com",
    projectId: "projectiot-c5a07",
    storageBucket: "projectiot-c5a07.appspot.com",
    messagingSenderId: "845797346987",
    appId: "1:845797346987:web:89c742cc39e125de9231ee",
    measurementId: "G-E3PBTVT1XQ"
  };

firebase.initializeApp(firebaseConfig);
var MyData = firebase.database().ref('/IOT-DEVICES');


app.post('/',express.json(),(req,res)=>{
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    })
    function ControlLight1(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on' || value == 'bật'){
            status = true;
        }
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('led1').push({
            'status':status,
            'time':dateTime 
        })
        if(value == 'bật' || value == 'tắt'){
            agent.add(`Đèn 1 đã ${value}`);
        }else{
            agent.add(`Light 1 is ${value}`);
        }
    }
    function ControlLight2(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on' || value == 'bật'){
            status = true;
        }
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('led2').push({
            'status':status,
            'time':dateTime 
        })
        if(value == 'bật' || value == 'tắt'){
            agent.add(`Đèn 2 đã ${value}`);
        }else{
            agent.add(`Light 2 is ${value}`);
        }
    }
    function ControlLight3(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on' || value == 'bật'){
            status = true;
        }
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('led3').push({
            'status':status,
            'time':dateTime 
        })
        if(value == 'bật' || value == 'tắt'){
            agent.add(`Đèn 3 đã ${value}`);
        }else{
            agent.add(`Light 3 is ${value}`);
        }
    }
    function ControlFan(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on' || value == 'bật'){
            status = true;
        }
        var date = timeZone.format("YYYY-MM-DD");
        var time = timeZone.format("HH:mm:ss");
        var dateTime = date + ", " + time;
        MyData.child('fan').push({
            'status':status,
            'time':dateTime 
        })
        if(value == 'bật' || value == 'tắt'){
            agent.add(`Quạt đã ${value}`);
        }else{
            agent.add(`Fan is ${value}`);
        }
    }

    async function GetTemperature(agent){  
        const value = agent.parameters.devices;
        const temp = await MyData.child('temp').once('value');
        if(value == 'weather'){
            agent.add(`Weather today is ${temp.val()} degrees C`);
        }else{
            agent.add(`Nhiệt độ hôm nay là ${temp.val()} độ C`);
        }   
    }

    var interMap = new Map();
    interMap.set('ControlLight1',ControlLight1);
    interMap.set('ControlLight2',ControlLight2);
    interMap.set('ControlLight3',ControlLight3);
    interMap.set('ControlFan',ControlFan);
    interMap.set('GetTemperature',GetTemperature);
    agent.handleRequest(interMap);
})

app.listen(process.env.PORT || 4000, ()=>console.log('Server on 4000'));