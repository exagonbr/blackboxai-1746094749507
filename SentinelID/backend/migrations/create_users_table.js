const pool = require('../db');

async function createUsersTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(createTableSQL);
    connection.release();
    console.log('Users table created or already exists.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}

createUsersTable();
