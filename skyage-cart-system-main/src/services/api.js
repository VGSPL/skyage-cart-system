export const API_BASE = "http://127.0.0.1:8000/api";

export function getAuthHeaders() {
  const token = localStorage.getItem("access");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
// ---------------- PRODUCTS ----------------
export async function getAllProducts() {
  const res = await fetch(`${API_BASE}/products/`);

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.results || data;
}

export async function getProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}/`);

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export async function getFeaturedProducts() {
  const res = await fetch(`${API_BASE}/products/featured/`);

  if (!res.ok) throw new Error("Failed to fetch featured products");

  const data = await res.json();
  return data.results || [];
}

export async function getSaleProducts() {
  const res = await fetch(`${API_BASE}/products/sale/`);

  if (!res.ok) throw new Error("Failed to fetch sale products");

  const data = await res.json();
  return data.results || [];
}


export async function searchProducts(query) {
  const res = await fetch(`${API_BASE}/products/search/?query=${query}`);

  if (!res.ok) throw new Error("Search failed");

  const data = await res.json();
  return data.results || [];
}
// ---------------- REGISTER ----------------
export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password1: data.password,
      password2: data.confirm_password,
      unique_id: data.unique_id,
      referral_code: data.referral_code || "",
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    console.log("REGISTER ERROR:", result);
    throw new Error(result.detail || "Registration failed");
  }

  return result;
}

// ---------------- LOGIN ----------------
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/jwt/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Invalid credentials");
  }

  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);

  return data;
}

// ---------------- REFRESH TOKEN ----------------
export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");

  const res = await fetch(`${API_BASE}/auth/jwt/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Token refresh failed");
  }

  localStorage.setItem("access", data.access);
  return data;
}

// ---------------- VERIFY TOKEN ----------------
export async function verifyToken() {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API_BASE}/auth/jwt/verify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return res.ok;
}

// ---------------- LOGOUT ----------------
export function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}
// ---------------- CART ----------------

// Get cart
export async function getCart() {
  const res = await fetch(`${API_BASE}/cart/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch cart");

  return res.json();
}


// Add to cart
export async function addToCart(productId, quantity = 1) {
  const res = await fetch(`${API_BASE}/cart/add/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to add to cart");
  }

  return data;
}

// Update cart item
export async function updateCartItem(productId, quantity) {
  const res = await fetch(`${API_BASE}/cart/update/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.detail || "Failed to update cart");

  return data;
}


export const deleteCartItem = async (product_id) => {
  const res = await fetch(`${API_BASE}/cart/delete/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({ product_id }),
  })

  if (!res.ok) {
    throw new Error("Failed to delete cart item")
  }

  return res.json()
}
// Get cart total
export async function getCartTotal() {
  const res = await fetch(`${API_BASE}/cart/total/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch cart total");

  return res.json();
}


export async function getProfile() {
  const token = localStorage.getItem("access");

  const res = await fetch("http://127.0.0.1:8000/api/profile/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

export async function updateProfile(data) {
  const token = localStorage.getItem("access");

  const res = await fetch("http://127.0.0.1:8000/api/profile/me/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return res.json();
}

export async function getUser() {
  const token = localStorage.getItem("access");

  const res = await fetch("http://127.0.0.1:8000/api/auth/users/me/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
}

// CREATE bank details
export async function createBankDetails(data) {
  const res = await fetch(`${API_BASE}/users/bank-details/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit bank details");

  return res.json();
}

// GET bank details
export async function getBankDetails() {
  const res = await fetch(`${API_BASE}/users/get-bank-details/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch bank details");

  return res.json();
}

//  Categories 
export async function getAllCategories() {
  const res = await fetch(`${API_BASE}/categories/`);

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}

//  Orders 
export async function getMyOrders(page = 1) {
  const res = await fetch(`${API_BASE}/orders/?page=${page}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  return res.json();
}

export async function getOrderDetail(id) {
  const res = await fetch(`${API_BASE}/orders/${id}/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch order detail");

  return res.json();
}

//  WALLET PAYMENT 
export async function walletPayment() {
  const res = await fetch(`${API_BASE}/payment/wallet_payment/`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Wallet payment failed");
  }

  return data;
}


//  WALLET BALANCE 
export async function getWalletBalance() {
  const res = await fetch(`${API_BASE}/wallet/balance/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet balance");
  }

  return res.json();
}


//  WALLET TRANSACTIONS 
export async function getWalletTransactions(page = null) {

  const url = page
    ? `${API_BASE}/wallet/transactions/?page=${page}`
    : `${API_BASE}/wallet/transactions/`;

  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet transactions");
  }

  return res.json();
}


//  WALLET WITHDRAW 
export async function withdrawWallet(data) {

  const res = await fetch(`${API_BASE}/wallet/withdraw/`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.detail || "Withdrawal failed");
  }

  return result;
}

//  GET SHIPPING ADDRESS 

export async function getShippingAddress() {

  const res = await fetch(`${API_BASE}/shipping-address/me/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (res.status === 404) return null;

  if (!res.ok) throw new Error("Failed to fetch shipping address");

  return res.json();
}


// CREATE SHIPPING ADDRESS
export async function createShippingAddress(data) {

  const res = await fetch(`${API_BASE}/shipping-address/me/`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create shipping address");

  return res.json();
}


// UPDATE SHIPPING ADDRESS
export async function updateShippingAddress(data) {

  const res = await fetch(`${API_BASE}/shipping-address/me/`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update shipping address");

  return res.json();
}

// GET USER REFERRALS
export async function getReferrals() {
  const res = await fetch(`${API_BASE}/user/referrals/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch referrals");

  return res.json();
}

//  Consultant Request 
export async function submitConsultantRequest(data) {
  const res = await fetch("http://127.0.0.1:8000/api/consultant/request/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.mobile_number?.[0] || "Failed to submit request"
    );
  }

  return result;
}