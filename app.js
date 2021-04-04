const express= require("express");
const bodyParser= require("body-parser");
const https= require("https");
const request = require("request");

const app=express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req,res){
    const fname= req.body.firstName;
    const lname= req.body.secondName;
    const email= req.body.email;

    var data= {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
            }
        ]
    }
    var jsonData= JSON.stringify(data);
    const url="https://us1.api.mailchimp.com/3.0/lists/45bb2e2e2e";
    const option= {
        method: "POST",
        auth: "Jyoti@123:22edfc23659208be12ab24dbcb951da9-us1"
    }
    const request= https.request(url, option, function(response){
        
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure.html", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("started at 3000");
})
//22edfc23659208be12ab24dbcb951da9-us1
// uid 45bb2e2e2e