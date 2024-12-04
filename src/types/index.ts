export interface User {
  email: string;
  orderCode: string;
  urlCode: string;
  redirectUrl: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  orderCode: string | null;
  urlCode: string | null;
}

export interface LoginFormData {
  email: string;
  orderCode: string;
}