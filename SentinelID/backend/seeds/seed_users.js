const pool = require('../db');
const bcrypt = require('bcrypt');

async function seedUsers() {
  try {
    const connection = await pool.getConnection();

    const passwordHash = await bcrypt.hash('password123', 10);

    const insertUserSQL = `
      INSERT INTO users (username, password)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE username=username
    `;

    await connection.query(insertUserSQL, ['admin', passwordHash]);

    connection.release();
    console.log('Seeded users successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

seedUsers();
