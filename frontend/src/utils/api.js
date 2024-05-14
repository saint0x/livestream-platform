// frontend/src/utils/api.js

const fetchWithAuth = async (url, method = 'GET', data = null, token) => {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // Include authentication token
        'Authorization': `Bearer ${token}`,
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch data');
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch data');
  }
};

export default fetchWithAuth;
