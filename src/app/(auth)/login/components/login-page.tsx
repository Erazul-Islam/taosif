"use client";

import { FormInput } from "@/src/components/form-elements";
import { Button } from "@/src/components/ui/button";
import { getFCMtoken } from "@/src/lib/getFCMtoken";
import { useLoginMutation } from "@/src/redux/services/authApi";
import { useEffect } from "react";
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

  useEffect(() => {
  const init = async () => {
    const token = await getFCMtoken();
    console.log("token",token)

    if (token) {
      await fetch("http://localhost:5000/message/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    }
  };

  init();
}, []);

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

      <div>
        <button>test</button>
      </div>
    </div>
  );
}
