const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req, res){
    const firstName=req.body.fName;
    const password= req.body.password;
    const email = req.body.email;
    console.log(firstName,password,email);
    const data= {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: password,
                }
            }
        ]
    }

const jsonData= JSON.stringify(data);
const url= "https://us9.api.mailchimp.com/3.0/lists/3911379704"
const options= {
    method: "POST",
    auth: "summydev1:8567a1d1dfa61c5d8677c560224c3c06-us9"

}
const request=https.request(url,options, function(response){
    

    if(response.statusCode == 200){
     res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(  __dirname+ "/failure.html");
    }
    response.on("data", function(data){
        console.log(JSON.parse(data))
    })

})
request.write(jsonData);
request.end();

})
app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server running at port 3000");
})

//API KEY
//8567a1d1dfa61c5d8677c560224c3c06-us9

//list id
//3911379704