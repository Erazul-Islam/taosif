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
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
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

export interface TResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

export interface MessagePayload {
  name: string;
  email: string;
  content: string;
}