"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const resetPassword = async () => {
    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    try {
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      setPasswordReset(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset you password</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      <label htmlFor="password">New Password</label>
      <input
        className="input-field"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="youcanneverguessit"
      />

      <button type="button" onClick={resetPassword} className="button">
        Reset
      </button>

      {passwordReset && (
        <div>
          <h2 className="text-2xl">Password resetted</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">
            There is some error
          </h2>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ResetPasswordPage;
