"use client";

import { useGetAllUsersQuery, useLoginMutation } from "@/src/redux/services/authApi";
import { useState } from "react";

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const { data: users } = useGetAllUsersQuery(null);
  console.log("use", users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(password)

  const handleLogin = async () => {
    try {
      const res = await login({
        email,
        password,
      }).unwrap();

      console.log('Login Response:', res);

      localStorage.setItem("accessToken", res.token);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-row items-center">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}