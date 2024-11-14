const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Para parsear el cuerpo de las solicitudes POST
const { pool } = require('./db'); // Conexión a la base de datos

const app = express();
const port = 3001;

// Habilitar CORS para que el frontend en http://127.0.0.1:5500 pueda acceder al backend
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Permite solicitudes solo desde este origen
}));

// Habilitar el parseo de JSON en las solicitudes
app.use(bodyParser.json()); 

// Función para guardar un participante en PostgreSQL
async function guardarParticipante(dni, nombreyapellido) {
    try {
        const queryText = 'INSERT INTO participantes (documento, nombreyapellido) VALUES ($1, $2) ON CONFLICT (documento) DO NOTHING';
        await pool.query(queryText, [dni, nombreyapellido]);
        console.log(`Participante con DNI ${dni} guardado exitosamente.`);
    } catch (error) {
        console.error('Error al guardar participante:', error);
    }
}

// Endpoint para guardar el participante
app.post('/guardar-participante', async (req, res) => {
    const { dni, nombreyapellido } = req.body;
    try {
        await guardarParticipante(dni, nombreyapellido);
        res.status(200).send('Participante guardado exitosamente.');
    } catch (error) {
        res.status(500).send('Error al guardar participante.');
    }
});

// Arrancar el servidor
app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
