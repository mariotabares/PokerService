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

        // Convercion del String
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

        let  mano1Numeros= JuegoDeCartasEnManoNumero(cart1m11, cart1m21, cart1m31, cart1m41, cart1m51);
        let  mano1Letras= JuegoDeCartasEnManoLetra(cart1m12, cart1m22, cart1m32, cart1m42, cart1m52);
        let  mano2Numeros= JuegoDeCartasEnManoNumero(cart2m11, cart2m21, cart2m31, cart2m41, cart2m51);
        let  mano2Letras= JuegoDeCartasEnManoLetra(cart2m12, cart2m22, cart2m32, cart2m42, cart2m52);

        //mano 1
        let mano1Total= [mano1Numeros[0],mano1Numeros[1],mano1Numeros[2],mano1Numeros[3], mano1Numeros[4],mano1Letras[0],mano1Letras[1],mano1Letras[2],mano1Letras[3]];
        //mano 2
        let mano2Total= [mano2Numeros[0],mano2Numeros[1],mano2Numeros[2],mano2Numeros[3], mano2Numeros[4],mano2Letras[0],mano2Letras[1],mano2Letras[2],mano2Letras[3]];


        //Validaciones de reglas de juego
        console.log(mano1Letras[0],"Mano 1 Letras");
        console.log(mano1Letras[1],"Mano 1 Letras");
        console.log(mano1Letras[2],"Mano 1 Letras");
        console.log(mano1Letras[3],"Mano 1 Letras");
        let valColor1= ColorEnMano(mano1Letras[0]);
        let valColor2= ColorEnMano(mano1Letras[1]);
        let valColor3= ColorEnMano(mano1Letras[2]);
        let valColor4= ColorEnMano(mano1Letras[3]);
         
        console.log(valColor1,"Color 1");


        //Funtion de validacion para color
        function ColorEnMano(cartas)   {
            let pintH=0;
            let pintD=0;
            let pintS=0;
            let pintC=0;

            if(cartas[0]==5){
                pintH=1;
            }else if(cartas[1]==5){
                pintC=1;
            }else if(cartas[2]==5){
                pintS=1;
            }else if(cartas[3]==5){
                pintD=1;
            }
           
            let pintmano=[pintH, pintC, pintS, pintD];
            return pintmano;
        }

       

        //Valindacion de cartas repetidas Numero
        
        function JuegoDeCartasEnManoNumero(num1, num2, num3, num4, num5){

            //Validacion de cartas repetidas Numero
            let cartas = [num1, num2, num3, num4, num5];
            let repeticiones1= CartasRepetidasNumero(num1, cartas);
            let repeticiones2= CartasRepetidasNumero(num2, cartas);
            let repeticiones3= CartasRepetidasNumero(num3, cartas);
            let repeticiones4= CartasRepetidasNumero(num4, cartas);
            let repeticiones5= CartasRepetidasNumero(num5, cartas);
            let totalCartas = [repeticiones1, repeticiones2, repeticiones3, repeticiones4, repeticiones5];
            return totalCartas; 
        }
        
         //Conteo de Cartas repetidas Numero
        function CartasRepetidasNumero(numero, array){
         //Validacion de cual cartas es la mano
            let repa=0;
            let rep2=0;
            let rep3=0;
            let rep4=0;
            let rep5=0;
            let rep6=0;
            let rep7=0;
            let rep8=0;
            let rep9=0;
            let rep10=0;
            let repj=0;
            let repq=0;
            let repk=0;
          

            //Validacion de cartas repetidas

            for (let i = 0; i < array.length; i++) {
                if (numero == array[i]) {
                    console.log(array[i],"Carta repetida");
                     switch (array[i]) {
                        case "A":repa++;break;
                        case "2":rep2++;break;
                        case "3":rep3++;break;
                        case "4":rep4++;break;
                        case "5":rep5++;break;
                        case "6":rep6++;break;
                        case "7":rep7++;break;
                        case "8":rep8++;break;
                        case "9":rep9++;break;
                        case "10":rep10++;break;
                        case "J":repj++;break;
                        case "Q":repq++;break;
                        case "K":repk++;break;
                    }
                }
            }
            let repmano=[repa, rep2, rep3, rep4, rep5, rep6, rep7, rep8, rep9,rep10, repj, repq, repk];
            return repmano;

        }

        //Conteo de Cartas repetidas Letra
        function CartasRepetidasLetra(letra, array){
            //Validacion de pinta en la mano
             let pintH=0;
             let pintD=0;
             let pintS=0;
             let pintC=0;
          

            //Validacion de cartas repetidas

            for (let i = 0; i < array.length; i++) {
                if (letra == array[i]) {
                     switch (array[i]) {
                        case "H":pintH++;break;
                        case "C":pintC++;break;
                        case "S":pintS++;break;
                        case "D":pintD++;break;
                    }
                }
            }
           let pintmano=[pintH, pintC, pintS, pintD];
            return pintmano;

        }

        //Validacion de cartas repetidas Letra
        function JuegoDeCartasEnManoLetra(let1, let2, let3, let4, let5){
            let cartas = [let1, let2, let3, let4, let5];
            let repeticiones1= CartasRepetidasLetra(let1, cartas);
            let repeticiones2= CartasRepetidasLetra(let2, cartas);
            let repeticiones3= CartasRepetidasLetra(let3, cartas);
            let repeticiones4= CartasRepetidasLetra(let4, cartas);
            let repeticiones5= CartasRepetidasLetra(let5, cartas);
            let mano=[repeticiones1, repeticiones2, repeticiones3, repeticiones4, repeticiones5];
            return mano; 
        }

      //Respuesta en pantalla

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