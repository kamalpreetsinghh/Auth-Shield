"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CreateUser } from "@/common.types";
import toast, { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<CreateUser>({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      toast.success(response.data.message);

      router.push("/login");
    } catch (error: any) {
      toast.error("User with this email already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-32 text-4xl font-extrabold">
        {loading ? "Processing" : "Signup"}
      </h1>
      <form className="mt-20 flex flex-col w-full max-w-md" onSubmit={onSignUp}>
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
          Signup
        </button>
        <Toaster />
      </form>

      <Link className="mt-10" href="/login">
        Visit login page
      </Link>
    </div>
  );
};

export default SignUpPage;
