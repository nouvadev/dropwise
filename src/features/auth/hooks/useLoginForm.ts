import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/api/authService";
import type { LoginRequest } from "@/types/auth";
import { validateEmail } from "@/lib/utils/validation";
import { useAuthStore } from "@/store/authStore";

// Constants - consider moving to a shared constants file if used elsewhere
const MIN_PASSWORD_LENGTH = 8;
const AUTH_TOKEN_KEY = "authToken";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({...prev, general: undefined}));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await loginUser(formData);
      if (response && response.token) {
        login(response.token);
      } else {
        // Optionally, handle missing token case more explicitly if needed,
        // for now, it proceeds to navigate if loginUser doesn't throw.
      }
      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: "An unexpected error occurred. Please try again later." });
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleSubmit,
  };
}; 