// dependencias
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Configura el middleware body-parser
app.use(bodyParser.json()); // Para analizar cuerpos JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para analizar cuerpos URL-encoded

// Configurar el enrutador
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/poker/validation', async (req, res) => {

    try {
        console.log(req.body);

        //Validacion de  
        // Toma de manos 
        let mano1 = req.body.hand1;
        let mano2 = req.body.hand2;
        console.log(mano1,"Mano 1");
        console.log(mano2,"Mano 2");
        // cartas en la mano
        let cartas1 = mano1.split(" ");
        let cartas2 = mano2.split(" ");
        console.log(cartas1,"Cartas 1");
        console.log(cartas2,"Cartas 2");

        // cartas mano 1 divididas
        let cart1m11 = cartas1[0][0];
        let cart1m12 = cartas1[0][1];
        let cart1m21 = cartas1[1][0];
        let cart1m22 = cartas1[1][1];
        let cart1m31 = cartas1[2][0];
        let cart1m32 = cartas1[2][1];
        let cart1m41 = cartas1[3][0];
        let cart1m42 = cartas1[3][1];
        let cart1m51 = cartas1[4][0];   
        let cart1m52 = cartas1[4][1];

        // cartas mano 2 divididas
        let cart2m11 = cartas2[0][0];   
        let cart2m12 = cartas2[0][1];
        let cart2m21 = cartas2[1][0];
        let cart2m22 = cartas2[1][1];
        let cart2m31 = cartas2[2][0];
        let cart2m32 = cartas2[2][1];
        let cart2m41 = cartas2[3][0];
        let cart2m42 = cartas2[3][1];
        let cart2m51 = cartas2[4][0];
        let cart2m52 = cartas2[4][1];


        console.log(cart1m11,"Carta 1 mano 1");
        console.log(cart1m12,"Carta 2 mano 1");



       res.json(
        {

        "winnerHand": {
          "type": cart1m11
        },
        "winnerHandType": {
          "type": cart1m12
        },
        "compositionWinnerHand": {
          "type": cart1m11

        }
      }
        
        );
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

app.use('/', router);
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});