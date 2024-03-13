/**
 * @name: Akkil M G
 * @description: SQL Database
 * @copyright: AkkilMG (c) 2022
 */

import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { UserModel, CaseReportingModel, EvidenceModel } from '../workers/model';
import { encrypt, hash } from '../workers/crypt';
import { createToken } from '../workers/auth';

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
});

// pool.connect((err: any) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to database');
// });

/* ------- User Registration and Authentication ------- */

// Search
export const SearchOneUser = async (key: string, value: string) => {
  try {
    const query = `SELECT * FROM USER WHERE ${key} = '${value}'`;
    var db = await pool.getConnection();
    var [rows, fields] = await db.query(query)
    db.release();
    if (rows) {
      return { success: true, data: rows }
    } else {
      return { success: false, message: "Couldn't find user!" }
    }
  } catch (e) {
    console.log(`database>SearchOne>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};

export const SearchMultiUser = async (keys: string[], values: string[]) => {
  try {
    var query = `SELECT * FROM USER WHERE ${keys[0]} = '${values[0]}'`;
    var db = await pool.getConnection();
    for (var i=1; i<keys.length; i++) {
      query += ` AND ${keys[i]} = '${values[i]}'`
    }
    var [rows, fields] = await db.query(query)
    db.release();
    if (Array.isArray(rows) && rows.length > 0) {
        return { success: true, data: rows }
      } else {
        return { success: false, message: "Couldn't find user!" }
      }
  } catch (e) {
    console.log(`database>SearchMulti>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};

// Signup
export const Signup = async (data: UserModel) => {
  try {
    if (!data) return { success: false, message: "No data was passed!" }
    var check = await SearchOneUser('Email', data.Email)
    if (check.success) return { success: false, message: "Email already exists!" }
    data.UserID = `UR${await hash()}`
    const query = `INSERT INTO USER (UserID, Username, Password, Email, PhoneNumber, WANumber) VALUES ('${data.UserID}', '${data.Username}', '${data.Password}', '${data.Email}', '${data.PhoneNumber}', '${data.WANumber}')`;
    var db = await pool.getConnection();
    var [rows, fields] = await db.query(query, data);
    db.release();
    if (rows) {
      return { success: true }
    } else {
      return { success: false, message: "Couldn't find user!" }
    }
  } catch (e) {
    console.log(`database>Signup>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};

// Signin
export const Signin = async (data: any) => {
  try {
    if (!data) return { success: false, message: "No data was passed!" }
    var check = await SearchOneUser('Email', data.Email)
    if (!check.success) return { success: false, message: "Email is not registered!" }
    check = await SearchMultiUser(['Email', 'Password'], [data.Email, data.Password])
    if (!check.success) return { success: false, message: "Incorrect password!" }
    var user;
      if (Array.isArray(check.data)) {
        check.data.forEach((row: any) => {
          user = row.UserID;
          return;
        });
        var token = await createToken(user);
        if (!token.success){
          return { success: false, message: token.message }
        }
        return { success: true, token: token.token }
      } else {
        return { success: false, message: "Something went wrong!" }
      }
  } catch (e) {
    console.log(`database>Signin>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};


// Change Password
export const ChangePassword = async (UserID: string, password: string) => {
  try {
    if (!password) return { success: false, message: "No password was passed!" }
    var check = await SearchOneUser('UserID', UserID)
    if (!check.success) return { success: false, message: "User is not registered!" }
    if (Array.isArray(check.data) && check.data.length > 0) {
      const query = `UPDATE USER SET Password = '${password}' WHERE UserID = '${UserID}'`;
      var db = await pool.getConnection();
      var [rows, fields] = await db.query(query);
      db.release();
      return { success: true }
    } else {
      return { success: false, message: "Something went wrong!" }
    }
  } catch (e) {
    console.log(`database>ChangePassword>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};

// Delete User
export const DeleteUser = async (UserID: string) => {
  try {
    var check = await SearchOneUser('UserID', UserID)
    if (!check.success) return { success: false, message: "User is not registered!" }
    if (Array.isArray(check.data) && check.data.length > 0) {
      const query = `DELETE FROM USER WHERE UserID = '${UserID}'`;
      var db = await pool.getConnection();
      var [rows, fields] = await db.query(query);
      db.release();
      return { success: true }
    } else {
      return { success: false, message: "Something went wrong!" }
    }
  } catch (e) {
    console.log(`database>DeleteUser>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};



// Show User
export const ShowUser = async (UserID: string) => {
  try {
    var check = await SearchOneUser('UserID', UserID)
    if (!check.success) return { success: false, message: "User is not registered!" }
    if (Array.isArray(check.data) && check.data.length > 0) {
      const query = `SELECT * FROM USER WHERE UserID = '${UserID}'`;
      var db = await pool.getConnection();
      var [rows, fields] = await db.query(query);
      db.release();
      if (Array.isArray(rows) && rows.length > 0) {
        return { success: true, data: rows[0] }
      } else {
        return { success: false, message: "Couldn't retrieve the user!" }
      }
    } else {
      return { success: false, message: "Couldn't find user!" }
    }
  } catch (e) {
    console.log(`database>ShowUser>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};


/* ------- Police Handlers ------- */

// Evidence
export const CreateEvidence = async (data: EvidenceModel) => {
  try {
    if (!data) return { success: false, message: "No data was passed!" }
    data.EvidenceID = `EV${await hash()}`;
    data.dateSubmitted = new Date().toISOString().split('T')[0]
    data.Anonymity = data.Anonymity ? 1 : 0;
    const query = `INSERT INTO EVIDENCE (UserID, EvidenceID, CaseID, CaseDesc, EvidenceDesc, EvidenceDocs, EvidenceLoc, Submitted, anonymity) VALUES ( '${data.UserID}', '${data.EvidenceID}', ${(data.CaseID=='' || data.CaseID == null) ? `${data.CaseID}`: 'NULL'}, '${data.CaseDesc}', '${data.EvidenceDesc}',  '${data.EvidenceDocs}', '${data.EvidenceLoc}', '${data.dateSubmitted}', '${data.Anonymity}')`;
    var db = await pool.getConnection();
    var [rows, fields] = await db.query(query, data)
    db.release();
    return { success: true }
  } catch (e) {
    console.log(`database>CreateEvidence>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};

// Update Evidence
export const UpdateEvidence = async (EvidenceID: string, data: any) => {
  try {
    if (!EvidenceID) return { success: false, message: "No EvidenceID was passed!" }
    const query = ``;
    var db = await pool.getConnection();
    var [rows, fields] = await db.query(query, data)
    db.release();
    return { success: true }
  } catch (e) {
    console.log(`database>CreateEvidence>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};


/**  */

// Report
export const CreateReport = async (data: CaseReportingModel) => {
  try {
    console.log(data);
    if (!data) return { success: false, message: "No data was passed!" }
    data.CaseID = `CA${await hash()}`;
    data.ReportDate = new Date().toISOString().split('T')[0]
    data.Anonymity = data.Anonymity ? 1 : 0;
    const query = `INSERT INTO CASE_REPORTING (CaseID, ReportDate, CrimeType, IncidentDate, IncidentLoc, UserID, EvidenceDoc, EvidenceDesc, SuspeciousDocs, SuspeciousDesc, Anonymity) VALUES('${data.CaseID}', '${data.ReportDate}', '${data.CrimeType}', '${data.IncidentDate}', '${data.IncidentLoc}', '${data.UserID}', '${data.EvidenceDoc}', '${data.EvidenceDesc}', '${data.SuspeciousDocs}', '${data.SuspeciousDesc}', ${data.Anonymity})`;
    var db = await pool.getConnection();
    var [rows, fields] = await db.query(query, data)
    db.release();
    return { success: true }
  } catch (e) {
    console.log(`database>CreateReport>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};

export const ShowReport = async (CaseID: string) => {
  try {
    if (!CaseID) return { success: false, message: "No CaseID was passed!" }
    const query = `SELECT * FROM CASE_REPORTING WHERE CaseID = '${CaseID}'`;
    var db = await pool.getConnection();
    var [rows, fields] = await db.query(query)
    db.release();
    if (Array.isArray(rows) && rows.length > 0) {
      return { success: true, data: rows[0] }
    } else {
      return { success: false, message: "Couldn't retrieve the report!" }
    }
  } catch (e) {
    console.log(`database>ShowReport>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
};

// Procedure based: GetRecentCases
export const GetRecentCases = async () => {
  try {
    const query = `CALL GetRecentCases()`;
    var db = await pool.getConnection();
    var [rows, fields] = await db.query(query)
    db.release();
    if (Array.isArray(rows) && rows.length > 0) {
      return { success: true, data: rows }
    } else {
      return { success: false, message: "Couldn't retrieve the report!" }
    }
  } catch (e) {
    console.log(`database>ShowReport>try: ${e.message}`);
    return { success: false, message: "Something went wrong!" }
  }
}