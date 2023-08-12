
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

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
       res.json(
        "Muy bien");
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

app.use('/', router);
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});