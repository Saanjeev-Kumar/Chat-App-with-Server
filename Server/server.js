const express = require("express");
const mongoUtils = require("./db/mongoUtils");
const { userModel } = require ('./model/user.model');
const cors = require("cors");
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 8080
mongoUtils.mongooseConnect();
app.use(express.json())
app.use(cors());

io.on('connection',(socket)=>{

    console.log('new connection made.');

    socket.on('join', function(data){
      //joining
      socket.join(data.room);

      console.log(data.user + 'joined the room : ' + data.room);

      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });
 socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

      socket.leave(data.room);
    });

    socket.on('message',function(data){

      io.in(data.room).emit('new message', {user:data.user, message:data.message});
    })
});

app.get("/users", (req, res) => {
    userModel.find()
    .then( data => {
        return res.send(data)
    })
    .catch(err => res.send(err))
})

app.post("/users",(req, res) =>{
    if(req.body){
        const userDetails = new userModel(req.body);
        userDetails.save()
        .then(data => {
            return res.send(data)
        })
        .catch(err => res.send(err))
    }
})

//getting particular data by username
app.get("/users/:userName", (req,res) =>{
    if(req.params){
        const userName = req.params.userName
        userModel.find({ userName })
        .then(data => {
            return res.send(data)
        })
        .catch(err => res.send(err))
    }
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

/* app.listen(port, () =>{
    console.log("Listening to PORT 8080");
}) */