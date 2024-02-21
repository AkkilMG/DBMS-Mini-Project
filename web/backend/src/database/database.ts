/**
 * @name: Akkil M G
 * @description: SQL Database
 * @copyright: AkkilMG (c) 2022
 */

import mysql from 'mysql2';
import { User } from '../workers/model';

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
});

db.connect((err: any) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

/* ------- User Registration and Authentication ------- */

export const SelectData = async () => {
  const query = 'SELECT * FROM USER';
  var err, res = db.query(query)
  if (err) {
    console.log(`database>SelectData>Query: ${err}`);
    return { success: false, message: "Something went wrong!" }
  }
  return { success: true }
}

// Signup
export const Signup = async (data: User) => {
  try {
    const query = 'INSERT INTO USER SET ?';
    var err, res = db.query(query, data)
    if (err) {
      console.log(`database>Signup>Query: ${err}`);
      return { success: false, message: "Something went wrong!" }
    }
    return { success: true }
  } catch (e) {
    console.log(`database>Signup>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};