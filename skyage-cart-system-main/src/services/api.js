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

// ---------------- SALE PRODUCTS ----------------
export async function getSaleProducts() {
  const res = await fetch(`${API_BASE}/products/sale/`, {
    headers: getAuthHeaders(),
  });

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
// ---------------- RECENT PRODUCTS ----------------
export async function getRecentProducts() {
  const res = await fetch(`${API_BASE}/products/recent/`, {
    headers: getAuthHeaders(), 
  });

  if (!res.ok) throw new Error("Failed to fetch recent products");

  const data = await res.json();

 
  return data.results || [];
}

// ---------------- AUTH ----------------
export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  if (!res.ok) throw new Error(result.detail || "Registration failed");

  return result;
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/jwt/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Invalid credentials");

  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);

  return data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");

  const res = await fetch(`${API_BASE}/auth/jwt/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Token refresh failed");

  localStorage.setItem("access", data.access);
  return data;
}

export async function verifyToken() {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API_BASE}/auth/jwt/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return res.ok;
}

export function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// 1. Activate User
export async function activateUser(uid, token) {
  const res = await fetch(`${API_BASE}/auth/users/activation/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, token }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Activation failed");
  return data;
}

// 2. Resend Activation
export async function resendActivationEmail(email) {
  const res = await fetch(`${API_BASE}/auth/users/resend_activation/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error("Failed to resend activation email");
  return res.json();
}

// 3. Reset Email
export async function resetEmail(email) {
  const res = await fetch(`${API_BASE}/auth/users/reset_email/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error("Failed to send reset email");
  return res.json();
}

// 4. Confirm Reset Email
export async function confirmResetEmail(new_email) {
  const res = await fetch(`${API_BASE}/auth/users/reset_email_confirm/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ new_email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Email reset failed");

  return data;
}

// 5. Set Email
export async function setEmail(current_password, new_email) {
  const res = await fetch(`${API_BASE}/auth/users/set_email/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ current_password, new_email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to update email");

  return data;
}

export async function resetPassword(email) {
  const res = await fetch(`${API_BASE}/auth/users/reset_password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || "Failed to send reset email");
  }

  return true;
}

export async function resetPasswordConfirm(uid, token, new_password) {
  const res = await fetch(`${API_BASE}/auth/users/reset_password_confirm/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid,
      token,
      new_password,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // backend sometimes sends array errors like:
    // { new_password: ["min 8 chars"] }
    const errorMsg =
      data?.new_password?.[0] ||
      data?.token?.[0] ||
      data?.uid?.[0] ||
      data?.detail ||
      "Password reset failed";

    throw new Error(errorMsg);
  }

  return true;
}

export async function setPassword(current_password, new_password) {
  const res = await fetch(`${API_BASE}/auth/users/set_password/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ current_password, new_password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Password update failed");

  return data;
}
// ---------------- CART ----------------
export async function getCart() {
  const res = await fetch(`${API_BASE}/cart/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(`${API_BASE}/cart/add/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ product_id: productId, quantity }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to add to cart");

  return data;
}

export async function updateCartItem(productId, quantity) {
  const res = await fetch(`${API_BASE}/cart/update/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ product_id: productId, quantity }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to update cart");

  return data;
}

export async function deleteCartItem(product_id) {
  const res = await fetch(`${API_BASE}/cart/delete/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ product_id }),
  });

  if (!res.ok) throw new Error("Failed to delete cart item");
  return res.json();
}

export async function getCartTotal() {
  const res = await fetch(`${API_BASE}/cart/total/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch cart total");
  return res.json();
}

// ---------------- PROFILE ----------------
export async function getProfile() {
  const res = await fetch(`${API_BASE}/profile/me/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(data) {
  const res = await fetch(`${API_BASE}/profile/me/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

export async function getUser() {
  const res = await fetch(`${API_BASE}/auth/users/me/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// ---------------- BANK ----------------
export async function createBankDetails(data) {
  const res = await fetch(`${API_BASE}/users/bank-details/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit bank details");
  return res.json();
}

export async function getBankDetails() {
  const res = await fetch(`${API_BASE}/users/get-bank-details/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch bank details");
  return res.json();
}

// ---------------- CATEGORY ----------------
export async function getAllCategories() {
  const res = await fetch(`${API_BASE}/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}

// ---------------- ORDERS ----------------
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

// ---------------- WALLET ----------------
export async function walletPayment() {
  const res = await fetch(`${API_BASE}/payment/wallet_payment/`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Wallet payment failed");

  return data;
}

export async function getWalletBalance() {
  const res = await fetch(`${API_BASE}/wallet/balance/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch wallet balance");
  return res.json();
}

export async function getWalletTransactions(page = null) {
  const url = page
    ? `${API_BASE}/wallet/transactions/?page=${page}`
    : `${API_BASE}/wallet/transactions/`;

  const res = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch wallet transactions");
  return res.json();
}

export async function withdrawWallet(data) {
  const res = await fetch(`${API_BASE}/wallet/withdraw/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.detail || "Withdrawal failed");

  return result;
}

// ---------------- SHIPPING ----------------
export async function getShippingAddress() {
  const res = await fetch(`${API_BASE}/shipping-address/me/`, {
    headers: getAuthHeaders(),
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch shipping address");

  return res.json();
}

export async function createShippingAddress(data) {
  const res = await fetch(`${API_BASE}/shipping-address/me/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create shipping address");
  return res.json();
}

export async function updateShippingAddress(data) {
  const res = await fetch(`${API_BASE}/shipping-address/me/`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update shipping address");
  return res.json();
}


// ---------------- REFERRALS ----------------
export async function getReferrals() {
  const res = await fetch(`${API_BASE}/user/referrals/`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch referrals");
  return res.json();
}

// ---------------- CONSULTANT ----------------
export async function submitConsultantRequest(data) {
  const res = await fetch(`${API_BASE}/consultant/request/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.mobile_number?.[0] || "Failed to submit request");
  }

  return result;
}














