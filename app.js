const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

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
})

app.listen(PORT,_=>{
  console.log(`local server started at ${PORT}`)
})