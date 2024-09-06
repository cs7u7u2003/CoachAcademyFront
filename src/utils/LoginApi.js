import config from '../config';

const login = async (username, password) => {
  try {
    const url = `${config.apiUrl}/Usuarios?Usuario=${encodeURIComponent(username)}&Password=${encodeURIComponent(password)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const message = await response.json();
      return { message: message.error };
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error during login');
  }
};

export { login };
