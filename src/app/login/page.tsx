"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CreateUser } from "@/common.types";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<CreateUser>({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      toast.success(response.data.message);

      router.push("/profile");
    } catch (error: any) {
      console.log(error.response.status);
      toast.error("Incorrect Username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-32 text-4xl font-extrabold">
        {loading ? "Processing" : "Login"}
      </h1>
      <form className="mt-20 flex flex-col w-full max-w-md" onSubmit={onLogin}>
        <label htmlFor="email">Email</label>
        <input
          className="input-field"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="myemailaddress@awesome.com"
        />
        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="youcanneverguessit"
        />
        <button type="submit" disabled={buttonDisabled} className="button">
          Login
        </button>
        <Link href="/forgotpassword" className="button text-center">
          Forgot Password
        </Link>
        <Toaster />
      </form>

      <Link className="mt-10" href="/signup">
        Visit Sign up page
      </Link>
    </div>
  );
};

export default LoginPage;
