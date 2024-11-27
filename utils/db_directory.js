import * as FileSystem from 'expo-file-system';

export const checkOrCreateDBPath = async (dbName) => {
  const dbDir = `${FileSystem.documentDirectory}SQLite/`;
  const dbPath = `${dbDir}${dbName}`;

  try {
    const dirInfo = await FileSystem.getInfoAsync(dbDir);

    // Si le chemin existe mais n'est pas un répertoire
    if (dirInfo.exists && !dirInfo.isDirectory) {
      console.log(`Erreur : Le chemin ${dbDir} existe mais ce n'est pas un répertoire. Suppression...`);
      await FileSystem.deleteAsync(dbDir, { idempotent: true });
    }

    // Si le répertoire n'existe pas, on le crée
    if (!dirInfo.exists) {
      console.log('Création du répertoire SQLite...');
      await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true });
    }

    return dbPath;
  } catch (error) {
    console.error('Erreur lors de la gestion du répertoire SQLite :', error);
    throw error;
  }
};
