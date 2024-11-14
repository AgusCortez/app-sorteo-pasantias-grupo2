const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.dqxbefojgyovvfohjnlz',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: 'd7qOyspVm00W0pyr',
  port: 6543,
});

// Exporta el pool para que pueda ser utilizado en otros archivos
module.exports = { pool };

