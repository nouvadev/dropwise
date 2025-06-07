import type { LoginRequest, SignupRequest } from '@/types/auth';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Handles API responses, parsing JSON and throwing structured errors.
 * @param response The fetch Response object.
 * @returns The parsed JSON data.
 * @throws Rejects with an Error containing a user-friendly message if the response is not OK.
 */
const handleResponse = async (response: Response) => {
  if (response.ok) {
    // For successful responses, check for content before parsing JSON.
    const responseText = await response.text();
    // If there's text, parse it as JSON. Otherwise, return a success indicator.
    // This correctly handles 200 or 201 with a body, and 204 No Content.
    return responseText ? JSON.parse(responseText) : { success: true };
  }

  // If the response is not OK, parse the error message from the JSON body.
  try {
    const errorData = await response.json();

    // Backend provides structured errors: { "error": "message" }.
    const errorMessage = errorData.error || 'An unexpected error occurred.';
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    // This handles cases where the error response is not valid JSON.
    return Promise.reject(new Error('An error occurred while communicating with the server.'));
  }
};


export const loginUser = async (credentials: LoginRequest) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const signupUser = async (userData: SignupRequest) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const logoutUser = () => {
  // The actual state management is handled by the Zustand store.
  // This function is here to keep all auth-related service calls in one file.
  // The component will call useAuthStore.getState().logout()
  // We can also clear any other related caches or data here if needed in the future.
  console.log("Logout triggered from authService.");
};

// Add other auth-related functions here (e.g., logout, forgotPassword)