import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import querystring from "querystring";
const app = express();
const port = 1000;

const apiurl = "https://apiclient.onrender.com/"


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.post("/login", async(req,res)=>{
  axios.post(`${apiurl}api/login`,
    querystring.stringify({
            user: req.body.user,
            pass: req.body.pass,
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) =>{
        if (typeof(response.data) === "string")
        {
          res.send("Incorrect Password or user not registered.");
        }else{
          const temp = response.data;
          res.render("database.ejs",{
            main:temp,
          });
        }
    });
})


app.listen(port, () => {
  console.log(`Server running on port:- ${port}`);
});
