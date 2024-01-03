const express = require("express")
const conexion = require("./db/index")

const app = express()
const Server = require("http").createServer();
const io = require("socket.io")(Server,{
    cors:{
        origin:"*",
    }
})
io.on('connection', socket=>{
    console.log("conecction")
    socket.on("client:datas_user",(ev)=>{
        //console.log(ev.id)
        conexion.query(`INSERT INTO User(id, name, description) VALUES ('${ev.id}','${ev.name}','${ev.description}')`,(err,resp)=>{
            if (err) {
                console.log(err)
            } else {
                console.log('Inserción exitosa:');
                socket.emit("server:insertado")
            }
        })
    })
})

app.get("/",(req,res)=>{
    res.send("FUNCIONANDO :)")
})

Server.listen(3000)
console.log("PORT RUNNING",3000)