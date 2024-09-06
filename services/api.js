// import axios from "axios";

const API_URL = "https://emp-backend-opal.vercel.app/api/employees";
// const API_URL = "http://localhost:5000/api/employees";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const fetchEmployees = async (page = 1, limit = 10, search = "") => {
//   try {
//     const response = await api.get("/", {
//       params: { page, limit, search },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     throw error;
//   }
// };

// export const fetchEmployeeById = async (id) => {
//   try {
//     const response = await api.get(`/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching employee:", error);
//     throw error;
//   }
// };

// export const addEmployee = async (employeeData) => {
//   try {
//     const response = await api.post("/", employeeData);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding employee:", error);
//     throw error;
//   }
// };

// export const updateEmployee = async (id, employeeData) => {
//   try {
//     const response = await api.put(`/${id}`, employeeData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating employee:", error);
//     throw error;
//   }
// };

// export const deleteEmployee = async (id) => {
//   try {
//     const response = await api.delete(`/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     throw error;
//   }
// };

// const API_URL = "http://localhost:5000/api/employees";

const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(API_URL + url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const fetchEmployees = async (page = 1, limit = 10, search = "") => {
  const params = new URLSearchParams({ page, limit, search });
  return apiFetch(`/?${params.toString()}`);
};

export const fetchEmployeeById = async (id) => {
  return apiFetch(`/${id}`);
};

export const addEmployee = async (employeeData) => {
  return apiFetch("/", {
    method: "POST",
    body: JSON.stringify(employeeData),
  });
};

export const updateEmployee = async (id, employeeData) => {
  return apiFetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(employeeData),
  });
};

export const deleteEmployee = async (id) => {
  return apiFetch(`/${id}`, {
    method: "DELETE",
  });
};
