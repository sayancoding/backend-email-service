const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000

app.use(cors({origin:"*"}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.status(200).json({
    "path":"root",
    "msg":"./GET method"
  })
})
app.get('/sendmail',(req,res)=>{
  res.status(200).json({
    "path": "./sendmail",
    "msg": "./GET method"
  })
})

app.post('/sendmail',(req,res)=>{
  const user = req.body;
  res.status(200).json({
    "path":"Getting info..",
    "msg":"./POST requested",
    "auth": process.env.EMAIL,
    "to":req.body.email
  })
  
  //transporter configure
  let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      user:process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
  const output = `
<p>Hey! Dear <strong><span style="color: rgb(209, 72, 65);">${req.body.name}</span></strong>,</p>
<p>I&#39;m Sayan Maity, self-taught student developer.I use to think to build on web that&#39;s live on internet. You can connect to involve me kinds of project.🛸</p>
<p>You can take a glance of my repos.🧰</p>
<p><a href="https://github.com/sayancoding"><strong><span style="background-color: rgb(239, 239, 239);">Github</span></strong></a></p>
<p>Touch me through🚀</p>
<p><a href="https://www.linkedin.com/in/sayan-maity-6316921a6/"><span style="background-color: rgb(239, 239, 239);">Linkedin</span></a>&nbsp; <a href="https://www.instagram.com/backward_space/"><span style="background-color: rgb(239, 239, 239);">Instagram</span></a></p>
<p><span style="color: rgb(44, 130, 201);">Thank You to connect.</span>🙂</p>
  `;

  let mailOption = {
    from: '"SayanCoding 👻" <alan.digital007@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Thank to connect", // plain text body
    html: output, // html body
  }

  transporter.sendMail(mailOption,(err,data)=>{
    if(err){
      console.log("Catch an error..")
    }else{
      console.log(`email sended to ${req.body.email} `)
      res.status(200).json({
        "ack":"mail sended.."
      })
    }
  })

})

app.listen(PORT,_=>{
  console.log(`local server started at ${PORT}`)
})