const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    socket.on('join', (options, callback) => {
        // LOG USER-?
       const {error, user} = addUser({id: socket.id, ...options})

       if(error) {
         return callback(error);
       }

        socket.join(user.room);
     // emite al client   
    socket.emit('message', generateMessage(`Bienvenido: ${user.username}`, 'BOT'))
    // emite a todos los de una sala, menos al client
    socket.broadcast.to(user.room).emit('message',
     generateMessage(`Se unio a la sala el usuario: ${user.username}`));


     io.to(user.room).emit('roomData', {
         room: user.room,
         users: getUsersInRoom(user.room)
     });


       // Sin parametro, es decir no mandamos un error D:
    callback();

        // socket.emit, io.emit ,socket.broadcaster.emit
        // io.to.emit Emite a usa sala especifica...
        //socket.broadcast.to.emit sala especifica excepto own

    });



    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if(!user) {
            callback("NO EXIST EL USUARIO")
        }
        console.log(user)


        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(message, user.username))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', 
        generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`, user.username))
        callback()
    })

    socket.on('disconnect', () => {
       const user = removeUser(socket.id);
       console.log("Se elimino")
       console.log(user);
       if(user) {
        io.to(user.room).emit('message', generateMessage(`El usuario ${user.username} se fue!!`))
        
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
       }
    });
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})