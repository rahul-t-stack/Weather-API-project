const express= require("express") ;
const https = require("https");
const bodyParser = require("body-parser") ;

const app = express() ;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html") ;

});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "b54846c6e839647b9f26808c97df20a7" ;
  const units = "metric" ;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ units +"&mode=json&lang=english" ;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      // console.log(data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon ;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
      res.write("<h1>Weather Description: " + weatherDescription + "</h1>");
      res.write("<h1>The Temperature in " + query + " is: " + temp + "degree Celcius.</h1>");
      res.write("<img src = " + imageURL + ">");
      res.send();

    });

  });
});


app.listen(3000,function(){
  console.log("Server started on port: 3000") ;
});
