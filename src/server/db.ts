import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text: string, params: []) => {
    console.log('executed query: ', text);
    return pool.query(text, params);
  },
};
