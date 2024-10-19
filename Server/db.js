
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.dqxbefojgyovvfohjnlz',
  host: 'aws-0-us-east-1.pooler.supabase.com',            
  database: 'postgres',  
  password: 'd7qOyspVm00W0pyr',    
  port: 6543,                   
});

// Este codigo es para probar la base!
const obtenerParticipantes = async () => {
  try {
      const client = await pool.connect(); // Conectar al pool
      const res = await client.query('SELECT * FROM Participantes'); // Consulta a la tabla
      console.log('Participantes:', res.rows); // Mostrar los resultados en consola
      client.release(); // Liberar el cliente
  } catch (err) {
      console.error('Error al obtener los participantes:', err.stack);
  }
};

// Llamar a la función para obtener los participantes
obtenerParticipantes();