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
  res.send('getting in app')
})
app.post('/sendmail',(req,res)=>{
  const user = req.body;
  res.status(200).json({
    "ack":"Getting info.."
  })
  console.log(req.body)
  
  //transporter configure
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  let mailOption = {
    from: '"SayanCoding 👻" <alan.digital007@gmail.com>', // sender address
    to: "sayanmaity007@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Thank to connect", // plain text body
    html: "<p>Thank</p>", // html body
  }

  transporter.sendMail(mailOption,(err,data)=>{
    if(err){
      console.log("get an error..")
    }else{
      console.log("email sended...")
    }
  })

})

app.listen(PORT,_=>{
  console.log(`local server started at ${PORT}`)
})