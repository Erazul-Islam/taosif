import { InputProps } from "../types/type";
import { FieldError, UseFormRegister } from "react-hook-form";

export const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  disabled,
  required,
  error,
  register,
  value,
  onChange,
}: InputProps & { value?: string; onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm py-2 font-medium text-white"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...(register ? register(name) : {})}
        className={`w-full rounded-lg border px-4 py-2 outline-none transition-all
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }
          disabled:cursor-not-allowed disabled:bg-gray-100`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export const FormNumberInput = ({
  name,
  label,
  placeholder,
  disabled,
  required,
  error,
  register,
}: InputProps) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type="number"
        placeholder={placeholder}
        disabled={disabled}
        {...(register ? register(name, { valueAsNumber: true }) : {})}
        className={`w-full rounded-lg border px-4 py-2 outline-none transition-all
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};



interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  options: Option[];
  error?: FieldError;
  register?: UseFormRegister<any>;
}

export const FormSelect = ({
  name,
  label,
  options,
  error,
  register,
}: Props) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        {...(register ? register(name) : {})}
        className={`w-full rounded-lg border px-4 py-2 outline-none transition-all
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }`}
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};