"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/profile");
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <hr />
      <p>Profile page</p>
      <h2 className="p-4 rounded bg-green-500">
        {data ? <Link href={`/profile/${data}`}>{data}</Link> : "Nothing"}
      </h2>
      <hr />
      <button onClick={logout} className="button">
        Logout
      </button>
      <button onClick={getUserDetails} className="button">
        Get User Details
      </button>
      <Toaster />
    </div>
  );
};

export default ProfilePage;
