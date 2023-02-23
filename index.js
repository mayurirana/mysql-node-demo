const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const userRouter = require('./users/router/users.router');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/user',userRouter)

app.listen(3000, () => console.log("server start on port 3000"));