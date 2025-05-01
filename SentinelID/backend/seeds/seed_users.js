const db = require('../db');
const bcrypt = require('bcrypt');

async function seedUsers() {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);

    const insertUserSQL = `
      INSERT OR REPLACE INTO users (username, password)
      VALUES (?, ?)
    `;

    await db.run(insertUserSQL, ['admin', passwordHash]);
    console.log('Seeded users successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

seedUsers();
