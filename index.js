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


        let  mano1Numeros= JuegoDeCartasEnManoNumero(cart1m11, cart1m21, cart1m31, cart1m41, cart1m51);
        let  mano1Letras= JuegoDeCartasEnManoLetra(cart1m12, cart1m22, cart1m32, cart1m42, cart1m52);
        let  mano2Numeros= JuegoDeCartasEnManoNumero(cart2m11, cart2m21, cart2m31, cart2m41, cart2m51);
        let  mano2Letras= JuegoDeCartasEnManoLetra(cart2m12, cart2m22, cart2m32, cart2m42, cart2m52);
      

        //mano 1
        let mano1Total= [mano1Numeros[0],mano1Numeros[1],mano1Numeros[2],mano1Numeros[3], mano1Numeros[4],mano1Letras[0],mano1Letras[1],mano1Letras[2],mano1Letras[3]];
        //mano 2
        let mano2Total= [mano2Numeros[0],mano2Numeros[1],mano2Numeros[2],mano2Numeros[3], mano2Numeros[4],mano2Letras[0],mano2Letras[1],mano2Letras[2],mano2Letras[3]];

        console.log(mano1Total,"Mano 1 numeros");
        console.log(mano2Total,"Mano 2 numeros");


        ValidacionColor(mano1Letras[0]);
        ValidacionColor(mano2Letras[0]);
        ValidacionPar(mano1Numeros[0]);
        ValidacionPar(mano1Numeros[1]);
        ValidacionPar(mano1Numeros[2]);
        ValidacionPar(mano1Numeros[3]);
        ValidacionPar(mano1Numeros[4]);
        ValidacionTerna(mano1Numeros[0]);
        ValidacionTerna(mano1Numeros[1]);
        ValidacionTerna(mano1Numeros[2]);
        ValidacionTerna(mano1Numeros[3]);
        ValidacionTerna(mano1Numeros[4]);
        /**********************(Validacion Poker) *************************/
        //Respuesta  de Poker
        function ValidacionPoker(poker){
            let valPoker = ValidacionPokerEnMano(poker);
            if(valPoker[0]==1){
                return console.log("Tiene poker de ases");
            }else if(valPoker[1]==1){
                return console.log("Tiene poker de dos");
            }else if(valPoker[2]==1){
                return console.log("Tiene poker de tres");
            }else if(valPoker[3]==1){
                return console.log("Tiene poker de cuatros");
            } else if(valPoker[4]==1){
                return console.log("Tiene poker de cincos");
            }else if(valPoker[5]==1){
                return console.log("Tiene poker de seises");
            }else if(valPoker[6]==1){
                return console.log("Tiene poker de sietes");
            }else if(valPoker[7]==1){
                return console.log("Tiene poker de ochos");
            }else if(valPoker[8]==1){
                return console.log("Tiene poker de nueves");
            }else if(valPoker[9]==1){
                return console.log("Tiene poker de dieces");
            }else if(valPoker[10]==1){
                return console.log("Tiene poker de jotas");
            }else if(valPoker[11]==1){
                return console.log("Tiene poker de reinas");
            }else if(valPoker[12]==1){
                return console.log("Tiene poker de reyes");
            } else{
                return console.log("No tiene poker");
            }
        }
        //Validacion de poker en la mano
        function ValidacionPokerEnMano(poker){
            let pokerAses = 0;
            let pokerDos = 0;
            let pokerTres = 0;
            let pokerCuatros = 0;
            let pokerCincos = 0;
            let pokerSeises = 0;
            let pokerSietes = 0;
            let pokerOchos = 0;
            let pokerNueves = 0;
            let pokerDieces = 0;
            let pokerJotas = 0;
            let pokerReinas = 0;
            let pokerReyes = 0;
            if(poker[0]==1){
                pokerAses++;
            }else if(poker[1]==1){
                pokerDos++;
            }else if(poker[2]==1){
                pokerTres++;
            }else if(poker[3]==1){
                pokerCuatros++;
            } else if(poker[4]==1){
                pokerCincos++;
            }else if(poker[5]==1){
                pokerSeises++;
            }else if(poker[6]==1){
                pokerSietes++;
            }else if(poker[7]==1){
                pokerOchos++;
            }else if(poker[8]==1){
                pokerNueves++;
            }else if(poker[9]==1){
                pokerDieces++;
            }else if(poker[10]==1){
                pokerJotas++;
            }else if(poker[11]==1){
                pokerReinas++;
            }else if(poker[12]==1){
                pokerReyes++;
            }
            let mano= [pokerAses,pokerDos,pokerTres,pokerCuatros,pokerCincos,pokerSeises,pokerSietes,pokerOchos,pokerNueves,pokerDieces,pokerJotas,pokerReinas,pokerReyes];


        }

        /*******************(Validacion de terna) *************************/
        //Respuesta  de Terna
        function ValidacionTerna(terna){
            let valTerna = ValidacionTernaEnMano(terna);

            if(valTerna[0]==1){
                return console.log("Tiene terna de ases");
            }else if(valTerna[1]==1){
                return console.log("Tiene terna de dos");
            }else if(valTerna[2]==1){
                return console.log("Tiene terna de tres");
            }else if(valTerna[3]==1){
                return console.log("Tiene terna de cuatros");
            } else if(valTerna[4]==1){
                return console.log("Tiene terna de cincos");
            }else if(valTerna[5]==1){
                return console.log("Tiene terna de seis");
            }else if(valTerna[6]==1){
                return console.log("Tiene terna de sietes");
            }else if(valTerna[7]==1){
                return console.log("Tiene terna de ochos");
            }else if(valTerna[8]==1){
                return console.log("Tiene terna de nueves");
            }else if(valTerna[9]==1){
                return console.log("Tiene terna de diez");
            }else if(valTerna[10]==1){
                return console.log("Tiene terna de J");
            }else if(valTerna[11]==1){
                return console.log("Tiene terna de Q");
            }else if(valTerna[12]==1){
                return console.log("Tiene terna de K");
            } else{
                return console.log("No tiene ternas");
            }

        }
        // Validacion de terna en mano
        function ValidacionTernaEnMano(cartas){
            let ternaA=0;
            let terna2=0;
            let terna3=0;
            let terna4=0;
            let terna5=0;
            let terna6=0;
            let terna7=0;
            let terna8=0;
            let terna9=0;
            let terna10=0;
            let ternaJ=0;
            let ternaQ=0;
            let ternaK=0;

            if(cartas[0]==3){
                ternaA=1;
            }else if(cartas[1]==3){
                terna2=1;
            }else if(cartas[2]==3){
                terna3=1;
            }else if(cartas[3]==3){
                terna4=1;
            }else if(cartas[4]==3){
                terna5=1;
            }else if(cartas[5]==3){
                terna6=1;
            }else if(cartas[6]==3){
                terna7=1;
            }else if(cartas[7]==3){
                terna8=1;
            }else if(cartas[8]==3){
                terna9=1;
            }else if(cartas[9]==3){
                terna10=1;
            }else if(cartas[10]==3){
                ternaJ=1;
            }else if(cartas[11]==3){
                ternaQ=1;
            }else if(cartas[12]==3){
                ternaK=1;
            }
            let mano = [ternaA,terna2,terna3,terna4,terna5,terna6,terna7,terna8,terna9,terna10,ternaJ,ternaQ,ternaK];
            return mano;

        }
        /*******************(Validacion de par) **************************/
        //Respuesta  de Par
        function ValidacionPar(par){
            let valPar = ValidacionParEnMano(par);

            if(valPar[0]==1){
                return console.log("Tiene par de ases");
            }else if(valPar[1]==1){
                return console.log("Tiene par de dos");
            }else if(valPar[2]==1){
                return console.log("Tiene par de tres");
            }else if(valPar[3]==1){
                return console.log("Tiene par de cuatros");
            } else if(valPar[4]==1){
                return console.log("Tiene par de cincos");
            }else if(valPar[5]==1){
                return console.log("Tiene par de seis");
            }else if(valPar[6]==1){
                return console.log("Tiene par de sietes");
            }else if(valPar[7]==1){
                return console.log("Tiene par de ochos");
            }else if(valPar[8]==1){
                return console.log("Tiene par de nueves");
            }else if(valPar[9]==1){
                return console.log("Tiene par de diez");
            }else if(valPar[10]==1){
                return console.log("Tiene par de J");
            }else if(valPar[11]==1){
                return console.log("Tiene par de Q");
            }else if(valPar[12]==1){
                return console.log("Tiene par de K");
            } else{
                return console.log("No tiene pares");
            }
        
        }
        //Funtion de validacion para par
        function ValidacionParEnMano(cartas)   {
            let parA=0;
            let par2=0;
            let par3=0;
            let par4=0;
            let par5=0;
            let par6=0;
            let par7=0;
            let par8=0;
            let par9=0;
            let par10=0;
            let parJ=0;
            let parQ=0;
            let parK=0;
          
                if(cartas[0]==2){
                    parA++;
                }else if(cartas[1]==2){
                    par2++;
                }else if(cartas[2]==2){
                    par3++;
                }else if(cartas[3]==2){
                    par4++;
                }else if(cartas[4]==2){
                    par5++;
                }else if(cartas[5]==2){
                    par6++;
                }else if(cartas[6]==2){
                    par7++;
                }else if(cartas[7]==2){
                    par8++;
                }else if(cartas[8]==2){
                    par9++;
                }else if(cartas[9]==2){
                    par10++;
                }else if(cartas[10]==2){
                    parJ++;
                }else if(cartas[11]==2){
                    parQ++;
                } else if(cartas[12]==2){
                    parK++;
                }

                let valPar= [parA,par2,par3,par4,par5,par6,par7,par8,par9,par10,parJ,parQ,parK];
            return valPar;
        } 
        /*******************(Validacion de color) ***********************/
        //Respuesta del Color
        function ValidacionColor(color){

            let valColor1= ColorEnMano(color);
    
            if(valColor1[0]==1){
                return console.log("Color de Corazones");
            }else if(valColor1[1]==1){
                 return console.log("Color de Diamantes");
            } else if(valColor1[2]==1){
                 return console.log("Color de trevol");
            }else if(valColor1[3]==1){
                 return console.log("Color de picas");
            }else{
                 return console.log("No hay color");
            }
             

        }
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
        /***************************************************************/
        //Valindacion de cartas repetidas Numero

        function JuegoDeCartasEnManoNumero(num1, num2, num3, num4, num5){

            //Validacion de cartas repetidas Numero
            let cartas = [num1, num2, num3, num4, num5];
            let repeticiones1= CartasRepetidasNumero(num1, cartas);
            let repeticiones2= CartasRepetidasNumero(num2, cartas);
            let repeticiones3= CartasRepetidasNumero(num3, cartas);
            let repeticiones4= CartasRepetidasNumero(num4, cartas);
            let repeticiones5= CartasRepetidasNumero(num5, cartas);
            let totalCartas=[repeticiones1, repeticiones2, repeticiones3, repeticiones4, repeticiones5]
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