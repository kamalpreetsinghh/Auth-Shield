"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CreateUser } from "@/common.types";

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
      console.log("Signup success" + response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="mt-32 text-4xl font-extrabold">
        {loading ? "Processing" : "Signup"}
      </h1>
      <form className="mt-20 flex flex-col w-full max-w-md" onSubmit={onSignUp}>
        <label htmlFor="email">email</label>
        <input
          className="mt-2 p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none 
          focus:border-gray-600"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="password">password</label>
        <input
          className="mt-2 p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none 
          focus:border-gray-600"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button
          type="submit"
          disabled={buttonDisabled}
          className="my-6 p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 disabled:bg-red-950 
          focus:outline-none focus:border-gray-600"
        >
          Signup
        </button>
      </form>

      <Link href="/login">Visit login page</Link>
    </div>
  );
};

export default SignUpPage;
