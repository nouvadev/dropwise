import type { LoginRequest, SignupRequest } from '@/types/auth'; // Assuming you'd define these types

const API_BASE_URL : string = import.meta.env.VITE_API_BASE_URL || '/api'; // Example: Using Vite env variables

export const loginUser = async (credentials: LoginRequest) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return response.json(); // Or handle tokens, user data directly
};

export const signupUser = async (userData: SignupRequest) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }
  return response.json();
};

// Add other auth-related functions here (e.g., logout, forgotPassword)