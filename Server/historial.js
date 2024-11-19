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
    let queryText = 'SELECT * FROM sorteos_duplicate'; 
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

app.post('/sorteos_duplicate', async (req, res) => {
  const {  
    
    nombre_evento,
    cant_ganadores,
    fechaFormateada,
    hora,
    listadoPremios,
    listadoPatrocinadores,
    nya_ganador,
    doc_ganadores

   } = req.body;

  try {
    
      const queryText = `
          INSERT INTO sorteos_duplicate (nombre_evento, cantidad_ganadores, fecha, hora, premio_producto, patrocinador_nombre, nya_ganador, doc_ganador)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await pool.query(queryText, [ 
        nombre_evento,
        cant_ganadores,
        fechaFormateada,
        hora,
        listadoPremios,
        listadoPatrocinadores,
        nya_ganador, 
        doc_ganadores
      ]);
      
      res.status(201).send('Sorteo agregado exitosamente');
  } catch (error) {
      console.error('Error al agregar sorteo:', error);
      res.status(500).send('Error al agregar sorteo');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
