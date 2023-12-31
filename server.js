


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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




// import requests

// API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
// headers = {"Authorization": "Bearer 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"}

// def query(filename):
//     with open(filename, "rb") as f:
//         data = f.read()
//     response = requests.post(API_URL, headers=headers, data=data)
//     return response.json()

// output = query("cats.jpg")

async function query(file) {
	const data = file;
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}





app.post("/describe", (req, res) => {
    console.log(req.body);
    query(req.body.imageFile).then((response) => {
        console.log(JSON.stringify(response));
        res.send({
            status:"successfull",
            captiopn : response,
        })
    }).catch(error=>{
        res.send({
            status:"unsuccessfull",
        })
    });
})
app.post("/data", (req, res) => {

    res.send("<img src  = 'https://res.cloudinary.com/sidd293/image/upload/v1695447406/activa-6g-right-front-three-quarter_ylfuah.webp'></img>");


});
app.get("/", (req, res) => {

    // const output = asticaImage();
    res.send({
        output: "output"
    })
})




app.listen('8090',()=>{
    console.log("listening on port 8080");
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