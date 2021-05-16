const express = require('express');
const dfff = require('dialogflow-fulfillment');
const moment = require('moment');
const firebase = require('firebase');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

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


const ControlLight2 = (agent)=>{

}
const ControlLight3 = (agent)=>{

}
const GetTemperature = (agent)=>{

}

app.post('/',express.json(),(req,res)=>{
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    })
    function ControlLight1(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on'){
            status = true;
        }
        const date = moment().format("HH:mm:ss, DD/MM/YYYY");
        MyData.child('led1').push({
            'status':status,
            'date':date
        })
        agent.add(`Light 1 is ${value}`);
    }
    function ControlLight2(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on'){
            status = true;
        }
        const date = moment().format("HH:mm:ss, DD/MM/YYYY");
        MyData.child('led2').push({
            'status':status,
            'date':date
        })
        agent.add(`Light 2 is ${value}`);
    }
    function ControlLight3(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on'){
            status = true;
        }
        const date = moment().format("HH:mm:ss, DD/MM/YYYY");
        MyData.child('led3').push({
            'status':status,
            'date':date
        })
        agent.add(`Light 3 is ${value}`);
    }
    function ControlFan(agent){
        const value = agent.parameters.status;
        var status = false;
        if(value == 'on'){
            status = true;
        }
        const date = moment().format("HH:mm:ss, DD/MM/YYYY");
        MyData.child('fan').push({
            'status':status,
            'date':date
        })
        agent.add(`Fan is ${value}`);
    }
    const getTemp = async()=>{
        const a = await MyData.child('temp').once('value');
        console.log(a.val());
    }
    async function GetTemperature(agent){  
        const temp = await MyData.child('temp').once('value');
        agent.add(`Weather today is ${temp.val()} degrees C`);
    }




    var interMap = new Map();
    interMap.set('ControlLight1',ControlLight1);
    interMap.set('ControlLight2',ControlLight2);
    interMap.set('ControlLight3',ControlLight3);
    interMap.set('ControlFan',ControlFan);
    interMap.set('GetTemperature',GetTemperature);
    agent.handleRequest(interMap);
})
app.listen(4000, ()=>console.log('Server on 4000'));