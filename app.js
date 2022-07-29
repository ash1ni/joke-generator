const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+ "/index.html")
})
app.post("/",(req,res)=>{
    
    console.log(req.body.jokeCategory)
    const query = req.body.jokeCategory
     https.get("https://v2.jokeapi.dev/joke/"+query+"?type=single",(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
          const jokeData =  JSON.parse(data)
            console.log(jokeData);
            
            //console.log(JSON.stringify(object));
            const temp = jokeData.joke
            const categoryJoke = jokeData.category
           // const imageURL = "https://www.meme-arsenal.com/en/create/template/1065873";
            console.log(temp)
            console.log(categoryJoke)
            res.write("<h1>Joke of the day is: <br> " + temp + "<br> </h1>")
           // res.write("<img src="+imageURL +"height = '200px' width ='200px' >")
            //res.write("<p>The category of the joke is: " +categoryJoke+"</p>")
            res.send()

        })
    })
})

// app.get("/", (req, res)=>{
//    
//     //res.send("Server is up and running")
// })


 app.listen(3000,()=>{
    console.log("Server is listening on port 3000 ")
 })