


import axios from 'axios';
import Student ,{Teacher} from "./MultipleClasses.js"
// const {Students,Teacher} = require('./MultipleClasses');
// const studets = new Students();




// var app = require("express")();

import express from 'express'
import bodyParser from 'body-parser';
import https from 'https'
import fs from 'fs';
// const axios = require('axios'); //npm install axios
// const fs = require('fs'); // Only needed for Input Method 2


//Input Method 1: https URL of a jpg/png image (faster)
var astica_input = 'http://sanysites.dx.am/uploads/2023.09.19_11:06:38_esp32-cam.jpg';
const app = express();

/*
    //Input Method 2: base64 encoded string of a local image (slower)  
    var path_to_local_file = 'image.jpg';
    var image_data = fs.readFileSync(path_to_local_file);
    var image_extension = path_to_local_file.split('.').pop();
    //For now, let's make sure to prepend appropriately with: "data:image/extension_here;base64" 
    var astica_input = `data:image/${image_extension};base64,${image_data.toString('base64')}`;
*/


const requestData = {
  tkn: 'E0C83FA5-E3FC-4BE6-8A6D-8A8E98585127F43BED1A-C2C6-4F54-B2AE-520D04BACF10',  // visit https://astica.ai
  modelVersion: '2.1_full', // 1.0_full, 2.0_full, or 2.1_full
  input: astica_input,
  visionParams: 'gpt, describe, describe_all, tags, faces', // comma separated, defaults to all
  gpt_prompt: '', // only used if visionParams includes "gpt" or "gpt_detailed"
  prompt_length: 95 // number of words in GPT response
};







const student = new Student();
const teacher = new Teacher();
const arr = [12,33,4,546,34];


// app.listen("8082", () => {
//     console.log("server running")
// })

app.use(bodyParser({
    urlEncoded: true
}))
app.get("/describe", (req, res) => {
    axios({
        method: 'post',
        url: 'https://vision.astica.ai/describe',
        data: requestData,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        console.log("response came seuccessfully");
        console.log(response);
res.status(200).json(response);
    }).catch((error) => {
        console.log("response didnt came good");
        console.log(error);
res.status(404).json(error);

    });
})
app.post("/data", (req, res) => {

    res.send({
        name: req.body
    });


});
app.get("/", (req, res) => {

    // const output = asticaImage();
    res.send({
        output: "output"
    })
})




app.listen('80',()=>{
    console.log("listening on port 80");
})

// const options = {
//     key: fs.readFileSync("domain.key"),
//     cert: fs.readFileSync("domain.crt"),
//     passphrase :'WEcanDOit2023!', 
//   };
    
//   // Creating https server by passing
//   // options and app object
//   https.createServer(options, app)
//   .listen(8082, function (req, res) {
//     console.log("Server started at port 8082");
//   });


// 3
// body , query , params