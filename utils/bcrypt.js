import * as Crypto from 'expo-crypto';

// Fonction pour hacher le mot de passe
export const hashPassword = async (password) => {
  try {
    // Hachage avec SHA-256
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hashedPassword;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
    throw new Error('Erreur lors du hachage du mot de passe');
  }
};


// Fonction pour vérifier un mot de passe
export const verifyPassword = async (enteredPassword, storedHash) => {
    try {
      // Hacher le mot de passe entré
      const hashedEnteredPassword = await hashPassword(enteredPassword);
  
      // Comparer le hash généré avec le hash stocké
      return hashedEnteredPassword === storedHash;
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe :', error);
      throw new Error('Erreur lors de la vérification du mot de passe');
    }
};