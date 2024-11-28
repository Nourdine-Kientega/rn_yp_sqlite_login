// utils/formValidation.js

export const validateSignup = (data) => {
  const { username, email, password, confirmPassword } = data;
  const errors = {};

  if (!username) errors.username = 'Veuillez remplir ce champ.';
  if (!email) {
    errors.email = 'Veuillez remplir ce champ.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'L’adresse email est invalide.';
  }

  if (!password) {
    errors.password = 'Veuillez remplir ce champ.';
  } else if (password.length < 8) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
  }

  return errors;
};

export const validateLogin = (data) => {
  const { email, password } = data;
  const errors = {};

  if (!email) {
    errors.email = 'Veuillez remplir ce champ.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'L’adresse email est invalide.';
  }

  if (!password) {
    errors.password = 'Veuillez remplir ce champ.';
  }

  return errors;
};
