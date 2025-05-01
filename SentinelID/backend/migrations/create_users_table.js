const db = require('../db');

async function createUsersTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await db.run(createTableSQL);
    console.log('Users table created or already exists.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
}

createUsersTable();
