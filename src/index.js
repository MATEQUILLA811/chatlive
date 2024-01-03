const express = require("express")
const app = express();
const conexion = require("./db/index");
const dotenv = require("dotenv");
dotenv.config();

const Server = require("http").createServer(app);
const io = require("socket.io")(Server,{
    cors:{
        origin:"*",
    }
})

app.set("port",process.env.PORT || 3000)


io.on('connection', socket=>{
    console.log("conecction")
    socket.on("client:datas_user",(ev)=>{
        //console.log(ev.id)
        conexion.query(`INSERT INTO User(id, name, description) VALUES ('${ev.id}','${ev.name}','${ev.description}')`,(err,resp)=>{
            if (err) {
                console.log(err)
            } else {
                console.log('Inserción exitosa:');
                socket.emit("server:insertado");
            }
        })
    })
})


app.use("/",require("./routers/index"))

/**
 * *run server*/
Server.listen(app.get("port"),()=>{
    console.log("on port : ",app.get("port"))
})

console.log("PORT RUNNING",3000)