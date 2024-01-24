const express = require("express")
const app = express();
const dotenv = require("dotenv");
const DB = require("./firebase/firebase")
const cors = require('cors');
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
        console.log("RECIBIDO: "+ev)
        DATOSALL = await DB.OBTENERDATOS('chat_personas',ev);
        //console.log(DATOSALL)
        io.emit('server:datos_sala',DATOSALL)
    })
    socket.on("user:sendMessage",(ev)=>{
        console.log(ev.id)
        io.emit('server:sendMessage',ev)
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