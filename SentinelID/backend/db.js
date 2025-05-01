const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file in the backend directory
const dbPath = path.join(__dirname, 'database.sqlite');

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Promisify database operations
const dbAsync = {
    run: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    },
    get: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    all: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};

module.exports = dbAsync;
