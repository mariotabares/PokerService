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


    //Resultados del juego
    Resultadosmano1=JuegoDeJugador(mano1Total);
    Resultadosmano2=JuegoDeJugador(mano2Total);
       
    /**************Conversion de resultados de juego*******************************/

    poker1=ConversionPoker(Resultadosmano1);
    terna1=ConversionTerna(Resultadosmano1);
    par1=ConversionPar(Resultadosmano1);
    cartaAlta1=ConversionCartaAlta(Resultadosmano1);
    color1=ConversionColor(Resultadosmano1);

    poker2=ConversionPoker(Resultadosmano2);
    terna2=ConversionTerna(Resultadosmano2);
    par2=ConversionPar(Resultadosmano2);
    cartaAlta2=ConversionCartaAlta(Resultadosmano2);
    color2=ConversionColor(Resultadosmano2);


    manoJugador1=ReglasDeJuego(poker1,color1,terna1,par1,cartaAlta1);
    manoJugador2=ReglasDeJuego(poker2,color2,terna2,par2,cartaAlta2);



    console.log(manoJugador1,"Mano 1");
    console.log(manoJugador2,"Mano 2");


    ganador=GanadorDeJuego(manoJugador1,manoJugador2);

    let ganadorOrdenado=ordenGanador(ganador);
    console.log(ganadorOrdenado,"Ganador Ordenado");


    function ordenGanador(ganador){
        let ordenGanador=[ganador[0],ganador[1],ganador[2],ganador[3]];
        if(ganador[2]==14){
            ordenGanador[2]="A";
        }else if(ganador[2]==13){
            ordenGanador[2]="K";
        }else if(ganador[2]==12){
            ordenGanador[2]="Q";
        }else if(ganador[2]==11){
            ordenGanador[2]="J";
        }else if(ganador[2]==10){
            ordenGanador[2]="10";
        }else if(ganador[2]==9){
            ordenGanador[2]="9";
        }else if(ganador[2]==8){
            ordenGanador[2]="8";
        }else if(ganador[2]==7){
            ordenGanador[2]="7";
        }else if(ganador[2]==6){
            ordenGanador[2]="6";
        }else if(ganador[2]==5){
            ordenGanador[2]="5";
        }else if(ganador[2]==4){
            ordenGanador[2]="4";
        }else if(ganador[2]==3){
            ordenGanador[2]="3";
        }else if(ganador[2]==2){
            ordenGanador[2]="2";
        }else if(ganador[3]==undefined){
            ordenGanador[3]="";
        }

        return ordenGanador;
        
    }

    /*************************(Comparacion para Ganador) *********************/

    function GanadorDeJuego(manoJugador1,manoJugador2){
       
        puntuacionDeMano1=0;
        puntucionDeMano2=0;
        let ganador=[];

        switch (manoJugador1[0]) {
            case "Poker":puntuacionDeMano1=7;break;
            case "FullHouse":puntuacionDeMano1=6;break;
            case "Flush":puntuacionDeMano1=5;break;
            case "terna":puntuacionDeMano1=4;break;
            case "TwoPair":puntuacionDeMano1=3;break;
            case "OnePair":puntuacionDeMano1=2;break;
            case "HighCard":puntuacionDeMano1=1;break;
        }
        switch (manoJugador2[0]) {
            case "Poker":puntuacionDeMano2=7;break;
            case "FullHouse":puntuacionDeMano2=6;break;
            case "Flush":puntuacionDeMano2=5;break;
            case "terna":puntuacionDeMano2=4;break;
            case "TwoPair":puntuacionDeMano2=3;break;
            case "OnePair":puntuacionDeMano2=2;break;
            case "HighCard":puntuacionDeMano2=1;break;
        }

        if(puntuacionDeMano1>puntuacionDeMano2){
            return ganador=["hand1",manoJugador1[0],manoJugador1[1],manoJugador1[2]];
        }else if(puntuacionDeMano1<puntuacionDeMano2){
            return ganador=["hand2",manoJugador2[0],manoJugador2[1],manoJugador2[2]];
        }else if(puntuacionDeMano1==puntuacionDeMano2){
            if(manoJugador1[1]>manoJugador2[1]){
                return ganador=["hand1",manoJugador1[0],manoJugador1[1],manoJugador2[2]];;
            }else if(manoJugador1[1]<manoJugador2[1]){
                return ganador=["hand2",manoJugador2[0],manoJugador2[1],manoJugador2[2]];;
            }else if(manoJugador1[1]==manoJugador2[1]){
                return "Empate"; 
            } 
        }    

    }

      /****************************(Funciones) ******************************/
       function ReglasDeJuego(poker,color,terna,par,cartaAlta){
        let juego=[poker,color,terna,par,cartaAlta];
        let pokeraux=[];
        let ternaFull=[];
        let ternaaux=[];
        let paraux=[];
        let cartaAltaaux=[];
        let coloraux=[];
         
        if(juego[0]!=0){
            return pokeraux=["Poker",juego[0]];
        }else if(juego[2]!=0 && juego[3]!=0){
            return ternaFull=["FullHouse",juego[2],juego[3]];
        }else if(juego[1]!=0){
            return coloraux=["Flush",juego[1]];
        }else if(juego[2]!=0){
            return ternaaux=["Three",juego[2]];
        }else if(juego[3].length==2 && juego[3][0]!=0 && juego[3][1]!=0){
            return paraux=["TwoPair",juego[3][0],juego[3][1]];
        }else if(juego[3]!=0){
            return paraux=["OnePair",juego[3]];
        }else if(juego[4]!=0){
            return cartaAltaaux=["HighCard",juego[4]] ;
        }else{
            return "No hay juego";
        }   

        }
       
        /****************(Conversion de Juegos en Mano )*********************/
        function ConversionColor(color){
            //Conversion de color
            let vectorColor=color[4];
            if(vectorColor==1){
                return "H";
            }else if(vectorColor==2){
                return "D";
            }else if(vectorColor==3){
                return "C";
            }else if(vectorColor==4){
                return "S";
            }else{
                return 0;
            }
        }

        function ConversionTerna(terna){
            let vectorTerna=terna[2];
            if(vectorTerna[1]==0 && vectorTerna[2]==0 && vectorTerna[3]==0 && vectorTerna[4]==0 && vectorTerna[0]){
                return 0;
            }else{
                return vectorTerna[0];
            }

        } 

        function ConversionPoker(poker){

            //Conversion de poker
            let vectorPoker=poker[3];
             if(vectorPoker[1]==0 && vectorPoker[2]==0 && vectorPoker[3]==0 && vectorPoker[4]==0){
                 return 0;
             }else{
                 return vectorPoker[0];
             }
        }

        function ConversionPar(par){
            //Conversion de par
            let vectorPar=par[1];
            let dospares=[];
            if(vectorPar[1]==0 && vectorPar[2]==0 && vectorPar[3]==0 && vectorPar[4]==0 && vectorPar[0]==0){
                return 0;
            }else if(vectorPar[0]!=0 && vectorPar[2]!=0){
                return dospares=[vectorPar[0],vectorPar[2]];
            }else{
                return vectorPar[0];
            }

        }

        function ConversionCartaAlta(cartaAlta){
            //Conversion de carta alta
            let vectorCartaAlta=cartaAlta[0];
            if(vectorCartaAlta[1]==0 && vectorCartaAlta[2]==0 && vectorCartaAlta[3]==0 && vectorCartaAlta[4]==0 && vectorCartaAlta[0]==0){
                return 0;
            }else{
                return vectorCartaAlta[0];
            }
        }
        /****************(Juegos en Mano )**********************************/   
        function JuegoDeJugador(mano){  
            let caralta1=ValidacionCartaAlta(mano[0]);
            let caralta2=ValidacionCartaAlta(mano[1]);
            let caralta3=ValidacionCartaAlta(mano[2]);
            let caralta4=ValidacionCartaAlta(mano[3]);
            let caralta5=ValidacionCartaAlta(mano[4]);
            let par1=ValidacionPar(mano[0]);
            let par2=ValidacionPar(mano[1]);
            let par3=ValidacionPar(mano[2]);
            let par4=ValidacionPar(mano[3]);
            let par5=ValidacionPar(mano[4]);
            let color=ValidacionColor(mano[5]);
            let terna1=ValidacionTerna(mano[0]);
            let terna2=ValidacionTerna(mano[1]);
            let terna3=ValidacionTerna(mano[2]);
            let terna4=ValidacionTerna(mano[3]);
            let terna5=ValidacionTerna(mano[4]);
            let poker1=ValidacionPoker(mano[0]);
            let poker2=ValidacionPoker(mano[1]);
            let poker3=ValidacionPoker(mano[2]);
            let poker4=ValidacionPoker(mano[3]);
            let poker5=ValidacionPoker(mano[4]);
            
            let totalCartaAlta=[caralta1, caralta2, caralta3, caralta4, caralta5];
            let totalPar=[par1, par2, par3, par4, par5];
            let totalTerna=[terna1, terna2, terna3, terna4, terna5];
            let totalPoker=[poker1, poker2, poker3, poker4, poker5];
            let totalColor=[color];

            totalCartaAlta.sort(function(a, b){return b-a});
            totalPar.sort(function(a, b){return b-a});
            totalTerna.sort(function(a, b){return b-a});
            totalPoker.sort(function(a, b){return b-a});


            let totalJuego=[totalCartaAlta, totalPar, totalTerna, totalPoker, totalColor];  
            
         return totalJuego;
        }     
        /**********************(Validacion Poker) *************************/
        //Respuesta  de Poker
        function ValidacionPoker(poker){
            let valPoker = ValidacionPokerEnMano(poker);
            let pokA=14;
            let pok2=2;
            let pok3=3;
            let pok4=4;
            let pok5=5;
            let pok6=6;
            let pok7=7;
            let pok8=8;
            let pok9=9;
            let pok10=10;
            let pokJ=11;
            let pokQ=12;
            let pokK=13;

            if(valPoker[0]==1){
                return pokA;
            }else if(valPoker[1]==1){
                return pok2;
            }else if(valPoker[2]==1){
                return pok3;
            }else if(valPoker[3]==1){
                return pok4;
            } else if(valPoker[4]==1){
                return pok5;
            }else if(valPoker[5]==1){
                return pok6;
            }else if(valPoker[6]==1){
                return pok7;
            }else if(valPoker[7]==1){
                return pok8;
            }else if(valPoker[8]==1){
                return pok9;
            }else if(valPoker[9]==1){
                return pok10;
            }else if(valPoker[10]==1){
                return pokJ;
            }else if(valPoker[11]==1){
                return pokQ;
            }else if(valPoker[12]==1){
                return pokK;
            } else{
                return 0;
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
            }else if(poker[1]==4){
                pokerDos++;
            }else if(poker[2]==4){
                pokerTres++;
            }else if(poker[3]==4){
                pokerCuatros++;
            } else if(poker[4]==4){
                pokerCincos++;
            }else if(poker[5]==4){
                pokerSeises++;
            }else if(poker[6]==4){
                pokerSietes++;
            }else if(poker[7]==4){
                pokerOchos++;
            }else if(poker[8]==4){
                pokerNueves++;
            }else if(poker[9]==4){
                pokerDieces++;
            }else if(poker[10]==4){
                pokerJotas++;
            }else if(poker[11]==4){
                pokerReinas++;
            }else if(poker[12]==4){
                pokerReyes++;
            }
            let mano= [pokerAses,pokerDos,pokerTres,pokerCuatros,pokerCincos,pokerSeises,pokerSietes,pokerOchos,pokerNueves,pokerDieces,pokerJotas,pokerReinas,pokerReyes];
            return mano;

        }

        /*******************(Validacion de terna) *************************/
        //Respuesta  de Terna
        function ValidacionTerna(terna){
            let valTerna = ValidacionTernaEnMano(terna);
            let tera=14;
            let ter2=2;
            let ter3=3;
            let ter4=4;
            let ter5=5;
            let ter6=6;
            let ter7=7;
            let ter8=8;
            let ter9=9;
            let ter10=10;
            let terJ=11;
            let terQ=12;
            let terK=13;

            if(valTerna[0]==1){
                return tera;
            }else if(valTerna[1]==1){
                return ter2;
            }else if(valTerna[2]==1){
                return ter3;
            }else if(valTerna[3]==1){
                return ter4;   
            } else if(valTerna[4]==1){
                return ter5;
            }else if(valTerna[5]==1){
                return ter6;
            }else if(valTerna[6]==1){
                return ter7;
            }else if(valTerna[7]==1){
                return ter8;
            }else if(valTerna[8]==1){
                return ter9;
            }else if(valTerna[9]==1){
                return ter10;
            }else if(valTerna[10]==1){
                return terJ;
            }else if(valTerna[11]==1){
                return terQ;
            }else if(valTerna[12]==1){
                return terK;
            } else{
                return 0;
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
            let parA=14;
            let par2=2;
            let par3=3;
            let par4=4;
            let par5=5;
            let par6=6;
            let par7=7;
            let par8=8;
            let par9=9;
            let par10=10;
            let parJ=11;
            let parQ=12;
            let parK=13;
            let sigCartaAlta=0;

            if(valPar[0]==1){
                return parA;
            }else if(valPar[1]==1){
                return par2;
            }else if(valPar[2]==1){
                return par3;
            }else if(valPar[3]==1){
                return par4;
            } else if(valPar[4]==1){
                return par5;
            }else if(valPar[5]==1){
                return par6;
            }else if(valPar[6]==1){
                return par7;
            }else if(valPar[7]==1){
                return par8;
            }else if(valPar[8]==1){
                return par9;
            }else if(valPar[9]==1){
                return par10;
            }else if(valPar[10]==1){
                return parJ;
            }else if(valPar[11]==1){
                return parQ;
            }else if(valPar[12]==1){
                return parK;
            } else{
                return sigCartaAlta;
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
        /*******************(Validacion de carta alta) ***********************/
        //Respuesta de carta alta
        function ValidacionCartaAlta(cartaAlta){
            let valCartaAlta = ValidacionCartaAltaEnMano(cartaAlta);

            let cartaAltaA=14;
            let cartaAlta2=2;
            let cartaAlta3=3;
            let cartaAlta4=4;
            let cartaAlta5=5;
            let cartaAlta6=6;
            let cartaAlta7=7;
            let cartaAlta8=8;
            let cartaAlta9=9;
            let cartaAlta10=10;
            let cartaAltaJ=11;
            let cartaAltaQ=12;
            let cartaAltaK=13;

            if(valCartaAlta[0]==1){
                return cartaAltaA;
            }else if(valCartaAlta[1]==1){
                return cartaAlta2;
            }else if(valCartaAlta[2]==1){
                return cartaAlta3;
            }else if(valCartaAlta[3]==1){
                return cartaAlta4;
            } else if(valCartaAlta[4]==1){
                return cartaAlta5;
            }else if(valCartaAlta[5]==1){
                return cartaAlta6;
            }else if(valCartaAlta[6]==1){
                return cartaAlta7;
            }else if(valCartaAlta[7]==1){
                return cartaAlta8;
            }else if(valCartaAlta[8]==1){
                return cartaAlta9;
            }else if(valCartaAlta[9]==1){
                return cartaAlta10;
            }else if(valCartaAlta[10]==1){
                return cartaAltaJ;
            }else if(valCartaAlta[11]==1){
                return cartaAltaQ;
            }else if(valCartaAlta[12]==1){
                return cartaAltaK;
            } else{
                return 0;
            }
        }
        //Funtion de validacion para carta alta
        function ValidacionCartaAltaEnMano(cartas)   {

            let cartaAltaA=0;
            let cartaAlta2=0;
            let cartaAlta3=0;
            let cartaAlta4=0;
            let cartaAlta5=0;
            let cartaAlta6=0;
            let cartaAlta7=0;
            let cartaAlta8=0;
            let cartaAlta9=0;
            let cartaAlta10=0;
            let cartaAltaJ=0;
            let cartaAltaQ=0;
            let cartaAltaK=0;

            if(cartas[0]==1){
                cartaAltaA++;   
            }else if(cartas[1]==1){
                cartaAlta2++;
            }else if(cartas[2]==1){
                cartaAlta3++;
            }else if(cartas[3]==1){
                cartaAlta4++;
            }else if(cartas[4]==1){
                cartaAlta5++;
            }else if(cartas[5]==1){
                cartaAlta6++;
            }else if(cartas[6]==1){
                cartaAlta7++;
            }else if(cartas[7]==1){
                cartaAlta8++;
            }else if(cartas[8]==1){
                cartaAlta9++;
            }else if(cartas[9]==1){
                cartaAlta10++;
            }else if(cartas[10]==1){
                cartaAltaJ++;
            }else if(cartas[11]==1){
                cartaAltaQ++;
            } else if(cartas[12]==1){
                cartaAltaK++;
            }
            let mano=[cartaAltaA,cartaAlta2,cartaAlta3,cartaAlta4,cartaAlta5,cartaAlta6,cartaAlta7,cartaAlta8,cartaAlta9,cartaAlta10,cartaAltaJ,cartaAltaQ,cartaAltaK];
            return mano;
         }
        /*******************(Validacion de color) ***********************/
        //Respuesta del Color
        function ValidacionColor(color){

            let valColor1= ColorEnMano(color);
            let colorH=1;
            let colorD=2;
            let colorC=3;
            let colorS=4;
    
            if(valColor1[0]==1){
                return colorH;
            }else if(valColor1[1]==1){
                 return colorC;
            } else if(valColor1[2]==1){
                 return colorS;
            }else if(valColor1[3]==1){
                 return colorD;
            }else{
                 return 0;
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
          "type": ganadorOrdenado[0]
        },
        "winnerHandType": {
          "type": ganadorOrdenado[1]
        },
        "compositionWinnerHand": {
          "type": ganadorOrdenado[2]+" & "+ganadorOrdenado[3]  

        }
      }
        
        );
    } 
    catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

app.use('/', router);
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});