
import { SQLiteProvider } from 'expo-sqlite';
import Navigation from './navigation/Navigation';
import { checkOrCreateDBPath } from './utils/db_path';
import { useEffect } from 'react';

export const initializeDatabase = async (db) => {
  try {
    db.execAsync(`
      PRAGMA journal_node = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT
      )
    `);
    console.log('Database inintialized !');
  } catch (error) {
    console.log('Error while the initialize the database: ', error);
  }
};

export default function App() {

  useEffect(() => {
    const prepareDatabase = async () => {
      try {
        const dbPath = await checkOrCreateDBPath('auth.db');
        console.log('Chemin vers la base de données :', dbPath);
      } catch (error) {
        console.error('Erreur lors de la préparation de la base de données :', error);
      }
    };

    prepareDatabase();
  }, []);

  return (
    <SQLiteProvider databaseName='auth.db' onInit={initializeDatabase}>
      <Navigation />
    </SQLiteProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
