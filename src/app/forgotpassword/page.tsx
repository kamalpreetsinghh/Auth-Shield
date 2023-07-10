"use client";

import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {};

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
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
