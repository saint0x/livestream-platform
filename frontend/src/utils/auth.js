// frontend/src/utils/auth.js

const loginUser = async (email, password) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login user");
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to login user");
  }
};

const registerUser = async (userData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

export { loginUser, registerUser };
