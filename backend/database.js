import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'chat.db'));

// Create messages table
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const saveMessage = (role, content) => {
  const stmt = db.prepare('INSERT INTO messages (role, content) VALUES (?, ?)');
  const info = stmt.run(role, content);
  return info.lastInsertRowid;
};

export const getAllMessages = () => {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY timestamp ASC');
  return stmt.all();
};

export const clearMessages = () => {
  const stmt = db.prepare('DELETE FROM messages');
  return stmt.run();
};

export default db;
