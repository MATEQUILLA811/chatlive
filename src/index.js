const express = require("express")
const app = express();
const conexion = require("./db/index");
const dotenv = require("dotenv");

const cors = require('cors');
dotenv.config();

app.use(cors()); // Habilitar CORS para todas las rutas

app.use(express.json());

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
        //console.log(ev)
        conexion.query(`INSERT INTO User(id, name, description) VALUES ('${ev.id}','${ev.name}','${ev.description}')`,(err,resp)=>{
            
            if (err) {
                console.log(err)
            } else {
                console.log('Inserción exitosa:');
                socket.emit("server:insertado");
            }
        })
    })
    socket.on("user_register_grup",(ev)=>{
        console.log(ev)
        conexion.query(`INSERT INTO Publicaciones(id, name, description, id_user, publico, urlimage) VALUES ('${ev.id_publicacion}','${ev.name}','${ev.description}','${ev.id_user}','${ev.publico}','${ev.urlImage}')`,(err,resp)=>{
            if(err){
                console.error(err)
            }else{
                console.log("se inserto correctamente")
                socket.emit("server:insertado_publicacion");

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