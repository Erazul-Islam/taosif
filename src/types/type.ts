import { FieldError, UseFormRegister } from "react-hook-form";

export interface BaseFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: FieldError;
}

export interface InputProps extends BaseFieldProps {
  type?: string;
  register?: UseFormRegister<any>;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data : {
    token: string;
    user: {
      id: number;
      email: string;
      name: string;
    }
  }
  token: string;
}