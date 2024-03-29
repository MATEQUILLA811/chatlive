const express = require("express")
const app = express();
const dotenv = require("dotenv");
const DB = require("./firebase/firebase")
const cors = require('cors');
const { Socket } = require("socket.io");
const connectedUsers = new Map(); // Utilizamos un Map para almacenar identificadores y nombres de usuario



dotenv.config();

app.use(cors({ origin: '*' }));

app.use(express.json());

const Server = require("http").createServer(app);
const io = require("socket.io")(Server,{
    cors:{
        origin:"*",
    }
})

app.set("port",process.env.PORT || 3000)

io.on('connection', socket=>{
    //console.log("conecction",socket.id)

    socket.on('user:datas_message',async(ev)=>{  
        //console.log("RECIBIDO: "+ev)
        DATOSALL = await DB.OBTENERDATOS('chat_personas',ev);
        //console.log(DATOSALL)
        socket.emit('server:datos_sala',DATOSALL)
    })

    socket.on("user:sendMessage",(ev)=>{
        console.log(ev.id)
        const datas = {...ev, senderId: socket.id}
        io.emit('server:sendMessage',datas)
    })


    socket.on('user:grupos_message',async(ev)=>{  
        console.log(ev)
        //console.log(ev)
        DATOSALL = await DB.OBTENERDATOS('chat_grupos',ev);
        console.log(DATOSALL)
        socket.emit('server:grupo_message',DATOSALL)
    })
    socket.on("user:grupoMessageSend",(ev)=>{
        //console.log(ev.id)
        io.emit('server:grupoMessageSend',ev)
    })
    socket.on('user:recived',(ev)=>{
        io.emit('server:recived',ev)
    })


    socket.on("user:active",(ev)=>{
        connectedUsers.set(socket.id, ev);
        console.log("ACTIVOS: "+ev)
        
        io.emit("server:active",ev)
    })
    

    socket.on("user:desactive",(ev)=>{
        io.emit("server:desactive",ev)
        console.log("DESACTIVOS: "+ev)
    })
    
})


app.get("/",(req,res)=>{
    const data = {
        nombre:"jasminfxcg",
        apellido:"llacuacvghb"
    }
    //AGREGAR('chat_personas',data)
  
  res.send("complete")
})

/**
 * *run server*/
Server.listen(app.get("port"),()=>{
    console.log("on port : ",app.get("port"))
})

console.log("PORT RUNNING",3000)