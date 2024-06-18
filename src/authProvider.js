import axios from "axios";

export const authProvider = {
  // Xử lý đăng nhập
  login: ({ username, password }) => {
    return axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login-admin`, {
        username,
        password,
      })
      .then((response) => {
        const { name, accessToken, refreshToken } = response.data;
        localStorage.setItem("username", name);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        if (error.response && error.response.status === 401) {
          throw new Error("Invalid username or password");
        } else {
          throw new Error("Login failed");
        }
      });
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(),
  getIdentity: () => Promise.resolve(demoUser),
};

export const demoUser = {
  id: "demo",
  fullName: "Admin",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&usqp=CAU",
};
