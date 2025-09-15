const API_URL = "http://localhost:5001/api/users";

export const userService = {
  async logIn(username: string | null, email: string | null, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    return response.json();
  },

  logout() {
    localStorage.removeItem("token");
    alert("Logout successfull!");
  },

  async register(
    username: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, isAdmin }),
    });
    return response.json();
  },
};
