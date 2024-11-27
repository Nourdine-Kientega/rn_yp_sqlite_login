// Database initialization
// export const initializeDatabase = async (db) => {
//     try {
//       db.execAsync(`
//         PRAGMA journal_node = WAL;
//         CREATE TABLE IF NOT EXISTS users (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           username TEXT,
//           email TEXT UNIQUE,
//           password TEXT
//         )
//       `);
//       console.log('Database inintialized !');
//     } catch (error) {
//       console.log('Error while the initialize the database: ', error);
//     }
// };