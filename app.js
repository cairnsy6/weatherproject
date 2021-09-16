const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const { request } = require("http");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){

res.sendFile(__dirname+ "/index.html");

})

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const apiKey = "1df46f610f1c040dde9a95912dcc53e2"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey

    https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png"
            res.write("<p>The weather is currently "+description+"</p>")
            res.write("<h1>The temp in "+query+" is "+temp+" degrees</h1>")
            res.write("<img src="+icon+">")
            res.send()
    })
    
})
})


app.listen(3000, function(){
    console.log("Server is running on port 3000")
})