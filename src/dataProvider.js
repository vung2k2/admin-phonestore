import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/admin`;

let refreshTokenPromise = null;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Accesstoken = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshAccessToken(refreshToken);
          refreshTokenPromise
            .then((newAccessToken) => {
              localStorage.setItem("accessToken", newAccessToken);
              refreshTokenPromise = null;
            })
            .catch(() => {
              refreshTokenPromise = null;
            });
        }

        const newAccessToken = await refreshTokenPromise;
        originalRequest.headers["Accesstoken"] = newAccessToken;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      null,
      {
        headers: { refreshToken: refreshToken },
      }
    );
    if (!response.data.accessToken || !response.data.refreshToken) {
      throw new Error("Refresh token response is empty");
    }
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    localStorage.setItem("refreshToken", newRefreshToken);
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem("username");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }
};

const dataProvider = {
  importProducts: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${apiUrl}/import-products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filter = JSON.stringify(params.filter);

    const url = `${apiUrl}/${resource}?page=${page}&perPage=${perPage}&sort=${field}&order=${order}&filter=${filter}`;
    const res = await axios.get(url);
    const dataWithId = res.data.map((item) => ({
      ...item,
      id: item._id,
    }));
    return {
      data: dataWithId,
      total: parseInt(res.headers.get("x-total-count")),
    };
  },

  getOne: async (resource, params) => {
    const res = await axios.get(`${apiUrl}/${resource}/${params.id}`);
    const dataWithId = { ...res.data, id: res.data._id };
    return { data: dataWithId };
  },

  // getMany: async (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   const url = `/${resource}?${new URLSearchParams(query).toString()}`;
  //   const response = await httpClient.get(url);
  //   return { data: response.data };
  // },

  // getManyReference: async (resource, params) => {
  //   const { page, perPage } = params.pagination;
  //   const { field, order } = params.sort;
  //   const query = {
  //     sort: JSON.stringify([field, order]),
  //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
  //     filter: JSON.stringify({
  //       ...params.filter,
  //       [params.target]: params.id,
  //     }),
  //   };
  //   const url = `/${resource}?${new URLSearchParams(query).toString()}`;
  //   const response = await httpClient.get(url);
  //   return {
  //     data: response.data,
  //     total: parseInt(response.headers["content-range"].split("/").pop(), 10),
  //   };
  // },

  update: async (resource, params) => {
    const res = await axios.put(
      `${apiUrl}/${resource}/${params.id}`,
      params.data
    );
    const dataWithId = { ...res.data, id: res.data._id };
    return { data: dataWithId };
  },

  // updateMany: async (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   const url = `/${resource}?${new URLSearchParams(query).toString()}`;
  //   const response = await httpClient.put(url, params.data);
  //   return { data: response.data };
  // },

  create: async (resource, params) => {
    const formData = new FormData();
    Object.keys(params.data).forEach((key) => {
      if (key === "image") formData.append("image", params.data[key].rawFile);
      else formData.append(key, params.data[key]);
    });
    try {
      const response = await axios.post(`${apiUrl}/${resource}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { data: { ...params.data, id: response.data._id } };
    } catch (error) {
      throw new Error("Failed to create product");
    }
  },

  delete: async (resource, params) => {
    const res = await axios.delete(`${apiUrl}/${resource}/${params.id}`);

    const dataWithId = { ...res.data, id: res.data._id };
    return { data: dataWithId };
  },

  deleteMany: async (resource, params) => {
    const res = await axios.delete(`${apiUrl}/${resource}`, {
      data: { ids: params.ids },
    });

    return { data: res.data };
  },
};

export default dataProvider;
