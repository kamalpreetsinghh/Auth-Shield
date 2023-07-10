"use client";

import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
    }

    const response = await axios.post("/api/users/forgotpassword", { email });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex flex-col items-center mt-20 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          className="input-field"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="myemailaddress@awesome.com"
        />
        <button className="button" type="submit">
          Send Reset Password Link
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
