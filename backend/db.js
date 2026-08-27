const Database = require("better-sqlite3");

const db = new Database("database.sqlite");

db.prepare(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playerName TEXT NOT NULL,
        score INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

console.log("🟢 SQLite Database Connected!");

module.exports = db;