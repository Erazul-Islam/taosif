"use client";

import { FormInput } from "@/src/components/form-elements";
import { Button } from "@/src/components/ui/button";
import { useLoginMutation } from "@/src/redux/services/authApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner"

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [login, { isLoading }] = useLoginMutation();

  const onsubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res.statusCode === 200) {
        toast.success("Login successful!");
      } else {
        toast.error("Login failed!");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onsubmit)} className="w-full max-w-sm">
        <FormInput
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          register={register}
          error={errors.email}
        />
        <FormInput
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          register={register}
          error={errors.password}
        />
        <Button type="submit" className="cursor-pointer my-2" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
