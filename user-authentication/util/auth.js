import axios from 'axios';

const API_KEY = "AIzaSyBiINHmy75O1oFXnlHhtp49POam9xR8ELI";

export async function createUser(email, password) {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  );
}
