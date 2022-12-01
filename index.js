const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
require('./utils/elephantSQL.js');
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000','http://localhost:3000/login']

var corsOptions = {
    origin:allowedOrigins,
    credentials:true
}

const userRouter = require('./routes/userRoutes.js');

const middle404 = require('./middlewares/error404.js');

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api',userRouter);
app.use(cookieParser());


app.use(express.urlencoded({extended:true}));
const loggerFormat = ':method :url :status :response-time ms - :res[content-length]'
app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

// app.use(express.static(path.join(__dirname,'client/build')));

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname + 'client/build/index.html'));
// })

app.use(middle404);
app.listen(port);

console.log('App is listening on port ' + port);