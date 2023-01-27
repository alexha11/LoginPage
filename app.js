//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) =>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    
    var jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/a850531240"
    
    const options = {
        method: "POST",
        auth: "Alex:69a4ee10d04379243182db88732e984-us17"
    }

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        }); 
    });
    console.log(firstName, lastName, email);
    
    request.write(jsonData);
    request.end();
});
app.post('/success', (req, res) => {
    res.redirect("/");
})

app.post("/failure", (req, res) => {
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});



//API key
//069a4ee10d04379243182db88732e984-us17


//List Id
//a850531240