const admin = require("firebase-admin");

// Configura la aplicación con tus credenciales y la configuración de Firebase
const serviceAccount = require("../llave/live-chat2-8a2ba-firebase-adminsdk-i2399-d97b10fcc2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://live-chat2-8a2ba-default-rtdb.firebaseio.com"
});

// Obtiene una instancia del servicio Firestore
const firestore = admin.firestore();

// Agrega un documento a una colección
const nuevaData = {
  campo1: "valor1",
  campo2: "valor2",
};

async function AGREGAR(COL,DATA){
    try{
        
        const docRef = await firestore.collection(COL).add(DATA);
        console.log("Documento agregado con ID:", docRef.id);
    }catch(error){
        
        console.error("Error al agregar documento:", error);
    }
}
async function OBTENERDATOS(coleccion, idSala) {
  const nombreColeccion = coleccion;

  try {
    const querySnapshot = await firestore.collection(nombreColeccion).where('id', '==', idSala).orderBy('timestamp','asc').get();


    const datos = [];
    querySnapshot.forEach((doc) => {
      datos.push(doc.data());
    });

    //console.log('Datos obtenidos por id_sala:', datos);
    return datos;
  } catch (error) {
    console.error('Error al obtener datos por id_sala:', error);
    throw error;
  }
}

module.exports={
  AGREGAR,
  OBTENERDATOS
};