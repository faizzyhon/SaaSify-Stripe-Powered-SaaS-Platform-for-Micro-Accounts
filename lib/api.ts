// This file contains functions for making API calls to your backend

// Generic fetch function with error handling
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    // Get auth token from localStorage
    const token = localStorage.getItem("authToken")

    // Add auth header if token exists
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Request failed with status ${response.status}`)
    }

    // Parse JSON response
    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Companies API
export const companiesApi = {
  getAll: async () => {
    return fetchWithAuth("/api/companies")
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/api/companies/${id}`)
  },

  create: async (data: any) => {
    return fetchWithAuth("/api/companies", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: any) => {
    return fetchWithAuth(`/api/companies/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/api/companies/${id}`, {
      method: "DELETE",
    })
  },
}

// Users API
export const usersApi = {
  getAll: async () => {
    return fetchWithAuth("/api/users")
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/api/users/${id}`)
  },

  create: async (data: any) => {
    return fetchWithAuth("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: any) => {
    return fetchWithAuth(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/api/users/${id}`, {
      method: "DELETE",
    })
  },
}

// Products API
export const productsApi = {
  getAll: async () => {
    return fetchWithAuth("/api/products")
  },

  getById: async (id: string) => {
    return fetchWithAuth(`/api/products/${id}`)
  },

  create: async (data: any) => {
    return fetchWithAuth("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: any) => {
    return fetchWithAuth(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/api/products/${id}`, {
      method: "DELETE",
    })
  },
}

// Dashboard API
export const dashboardApi = {
  getStats: async () => {
    return fetchWithAuth("/api/dashboard/stats")
  },

  getOverviewData: async () => {
    return fetchWithAuth("/api/dashboard/overview")
  },

  getRecentActivity: async () => {
    return fetchWithAuth("/api/dashboard/activity")
  },
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return fetchWithAuth("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  register: async (userData: any) => {
    return fetchWithAuth("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  forgotPassword: async (email: string) => {
    return fetchWithAuth("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },

  resetPassword: async (token: string, password: string) => {
    return fetchWithAuth("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    })
  },
}
