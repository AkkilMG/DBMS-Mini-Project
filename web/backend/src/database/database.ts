/**
 * @name: Akkil M G
 * @description: SQL Database
 * @copyright: AkkilMG (c) 2022
 */

import mysql from 'mysql';
import { User } from '../workers/model';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

/* ------- User Registration and Authentication ------- */

// Signup
export const Signup = async (data: User) => {
  try {
    new Promise((resolve, reject) => {
      const query = 'INSERT INTO user SET ?';
      db.query(query, data, (error, results) => {
          if (error) {
            console.log(`database>Signup>Query: ${error}`);
            return { success: false, message: "Something went wrong!" }
          }
          // resolve(data);
          return { success: true }
      });
    });
  } catch (e) {
    console.log(`database>Signup>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};