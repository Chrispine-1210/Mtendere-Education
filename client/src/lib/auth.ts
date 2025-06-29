import { apiRequest } from "./queryClient";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const response = await apiRequest("POST", "/api/auth/login", {
    username,
    password,
  });
  
  return response.json();
}

export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
  role?: string;
}): Promise<{ user: AuthUser }> {
  const response = await apiRequest("POST", "/api/auth/register", userData);
  
  return response.json();
}

export function getStoredAuth(): { token: string | null; user: AuthUser | null } {
  try {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    const user = userStr ? JSON.parse(userStr) : null;
    
    return { token, user };
  } catch (error) {
    console.error("Error getting stored auth:", error);
    return { token: null, user: null };
  }
}

export function storeAuth(token: string, user: AuthUser): void {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}
