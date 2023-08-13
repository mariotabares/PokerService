/**
 * @file index.js
 * @version 1.0
 * @module index
 * @requires express
 * @requires body-parser
 * @requires axios
 *  
 * @autor Mario Alejandro Tabares
 * 
 * 
 * @description Servidor para juego de poker.
 * .  
 */
        

// Dependencias para el servidor 
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

// Estructura del servidor para

router.get('/', async (req, res) => {

    // Respuesta del servidor
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Estructura del servidor para el juego de poker
router.post('/poker/validation', async (req, res) => {

    try {
        console.log(req.body);

        //Validacion de manos 

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

        let  juegoMano1Numeros = JuegoDeCartasEnManoNumero(cart1m11, cart1m21, cart1m31, cart1m41, cart1m51);
        let juegoMano1Letras = JuegoDeCartasEnManoLetra(cart1m12, cart1m22, cart1m32, cart1m42, cart1m52);
        let  juegoMano2Numeros = JuegoDeCartasEnManoNumero(cart2m11, cart2m21, cart2m31, cart2m41, cart2m51);
        let juegoMano2Letras = JuegoDeCartasEnManoLetra(cart2m12, cart2m22, cart2m32, cart2m42, cart2m52);

        console.log(juegoMano1Numeros,"Juego mano 1");
        console.log(juegoMano1Letras,"Juego mano 1");
        console.log(juegoMano2Numeros,"Juego mano 2");
        console.log(juegoMano2Letras,"Juego mano 2");
       

        //Valindacion de cartas repetidas Numero
        
        function JuegoDeCartasEnManoNumero(num1, num2, num3, num4, num5){
            let cartas = [num1, num2, num3, num4, num5];
            let repeticiones1= CartasRepetidas(num1, cartas);
            let repeticiones2= CartasRepetidas(num2, cartas);
            let repeticiones3= CartasRepetidas(num3, cartas);
            let repeticiones4= CartasRepetidas(num4, cartas);
            let repeticiones5= CartasRepetidas(num5, cartas);
            let mano=[repeticiones1, repeticiones2, repeticiones3, repeticiones4, repeticiones5];
            return mano; 
        }

        function CartasRepetidas(numero, array){
            let par = 0;
            for (let i = 0; i < array.length; i++) {
                if (numero == array[i]) {
                    par++;
                }
            }
            return par;
        }

        //Validacion de cartas repetidas Letra
        function JuegoDeCartasEnManoLetra(let1, let2, let3, let4, let5){
            let cartas = [let1, let2, let3, let4, let5];
            let repeticiones1= CartasRepetidas(let1, cartas);
            let repeticiones2= CartasRepetidas(let2, cartas);
            let repeticiones3= CartasRepetidas(let3, cartas);
            let repeticiones4= CartasRepetidas(let4, cartas);
            let repeticiones5= CartasRepetidas(let5, cartas);
            let mano=[repeticiones1, repeticiones2, repeticiones3, repeticiones4, repeticiones5];
            return mano; 
        }



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