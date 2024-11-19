// historial.js
const express = require('express');
const { pool } = require('./db');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Función para obtener todos los sorteos o buscar por nombre del evento
app.get('/historial', async (req, res) => {
  const { busqueda } = req.query; 
  try {
    let queryText = 'SELECT * FROM sorteos'; 
    let queryParams = [];

    if (busqueda) {
      queryText += ' WHERE nombre_evento ILIKE $1';
      queryParams.push(`%${busqueda}%`);
    }

    const result = await pool.query(queryText, queryParams); // Ejecutar la consulta
    res.json(result.rows); // Enviar los resultados al frontend
  } catch (error) {
    console.error('Error al obtener el historial:', error);
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
